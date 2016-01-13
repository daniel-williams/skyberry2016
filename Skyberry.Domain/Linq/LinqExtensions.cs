using PagedList;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace Skyberry.Domain.Linq
{
    public static class LinqExtensions
    {

        #region Build Predicate

        private static readonly MethodInfo StringContainsMethod = typeof(string).GetMethod(@"Contains", BindingFlags.Instance | BindingFlags.Public, null, new[] { typeof(string) }, null);
        private static readonly MethodInfo BooleanEqualsMethod = typeof(bool).GetMethod(@"Equals", BindingFlags.Instance | BindingFlags.Public, null, new[] { typeof(bool) }, null);

        public static Expression<Func<TDbType, bool>> BuildPredicate<TDbType, TSearchCriteria>(TSearchCriteria searchCriteria)
        {
            var predicate = PredicateBuilder.True<TDbType>();

            // Iterate the search criteria properties
            var searchCriteriaPropertyInfos = searchCriteria.GetType().GetProperties();
            foreach (var searchCriteriaPropertyInfo in searchCriteriaPropertyInfos)
            {
                // Get the name of the DB field, which may not be the same as the property name.
                var dbFieldName = GetDbFieldName(searchCriteriaPropertyInfo);
                // Get the target DB type (table)
                var dbType = typeof(TDbType);
                // Get a MemberInfo for the type's field (ignoring case
                // so "FirstName" works as well as "firstName")
                var dbFieldMemberInfo = dbType.GetMember(dbFieldName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance).Single();
                // STRINGS
                if (searchCriteriaPropertyInfo.PropertyType == typeof(string))
                {
                    predicate = ApplyStringCriterion(searchCriteria, searchCriteriaPropertyInfo, dbType, dbFieldMemberInfo, predicate);
                }
                // BOOLEANS
                else if (searchCriteriaPropertyInfo.PropertyType == typeof(bool?))
                {
                    predicate = ApplyBoolCriterion(searchCriteria, searchCriteriaPropertyInfo, dbType, dbFieldMemberInfo, predicate);
                }
                // ADD MORE TYPES...
            }

            return predicate;
        }

        private static Expression<Func<TDbType, bool>> ApplyStringCriterion<TDbType, TSearchCriteria>(TSearchCriteria searchCriteria, PropertyInfo searchCriterionPropertyInfo, Type dbType, MemberInfo dbFieldMemberInfo, Expression<Func<TDbType, bool>> predicate)
        {
            // Check if a search criterion was provided
            var searchString = searchCriterionPropertyInfo.GetValue(searchCriteria) as string;
            if (string.IsNullOrWhiteSpace(searchString))
            {
                return predicate;
            }
            // Then "and" it to the predicate.
            // e.g. predicate = predicate.And(x => x.firstName.Contains(searchCriterion.FirstName)); ...
            // Create an "x" as TDbType
            var dbTypeParameter = Expression.Parameter(dbType, @"x");
            // Get at x.firstName
            var dbFieldMember = Expression.MakeMemberAccess(dbTypeParameter, dbFieldMemberInfo);
            // Create the criterion as a constant
            var criterionConstant = new Expression[] { Expression.Constant(searchString) };
            // Create the MethodCallExpression like x.firstName.Contains(criterion)
            var containsCall = Expression.Call(dbFieldMember, StringContainsMethod, criterionConstant);
            // Create a lambda like x => x.firstName.Contains(criterion)
            var lambda = Expression.Lambda(containsCall, dbTypeParameter) as Expression<Func<TDbType, bool>>;
            // Apply!
            return predicate.And(lambda);
        }

        private static Expression<Func<TDbType, bool>> ApplyBoolCriterion<TDbType, TSearchCriteria>(TSearchCriteria searchCriteria, PropertyInfo searchCriterionPropertyInfo, Type dbType, MemberInfo dbFieldMemberInfo, Expression<Func<TDbType, bool>> predicate)
        {
            // Check if a search criterion was provided
            var searchBool = searchCriterionPropertyInfo.GetValue(searchCriteria) as bool?;
            if (searchBool == null)
            {
                return predicate;
            }
            // Then "and" it to the predicate.
            // e.g. predicate = predicate.And(x => x.isActive.Contains(searchCriterion.IsActive)); ...
            // Create an "x" as TDbType
            var dbTypeParameter = Expression.Parameter(dbType, @"x");
            // Get at x.isActive
            var dbFieldMember = Expression.MakeMemberAccess(dbTypeParameter, dbFieldMemberInfo);
            // Create the criterion as a constant
            var criterionConstant = new Expression[] { Expression.Constant(searchBool) };
            // Create the MethodCallExpression like x.isActive.Equals(criterion)
            var equalsCall = Expression.Call(dbFieldMember, BooleanEqualsMethod, criterionConstant);
            // Create a lambda like x => x.isActive.Equals(criterion)
            var lambda = Expression.Lambda(equalsCall, dbTypeParameter) as Expression<Func<TDbType, bool>>;
            // Apply!
            return predicate.And(lambda);
        }

        private static string GetDbFieldName(PropertyInfo propertyInfo)
        {
            var fieldMapAttribute = propertyInfo.GetCustomAttributes(typeof(FieldMapAttribute), false).FirstOrDefault();
            var dbFieldName = fieldMapAttribute != null ? ((FieldMapAttribute)fieldMapAttribute).Field : propertyInfo.Name;
            return dbFieldName;
        }

        #endregion


        #region Applying Sorting and Paging

        public static IPagedList<T> ApplySortingPaging<T>(this IOrderedQueryable<T> query, PageSortCriteria pageSortCriteria, string defaultSort)
        {
            bool isDescending = false;
            string sortBy = defaultSort;
            if (!string.IsNullOrWhiteSpace(pageSortCriteria.Sort))
            {
                sortBy = pageSortCriteria.Sort;
                if (sortBy.StartsWith("-"))
                {
                    sortBy = sortBy.Substring(1);
                    isDescending = true;
                }
            }
            query = isDescending ? query.OrderByDescending(sortBy) : query.OrderBy(sortBy);

            return query.ToPagedList<T>(pageSortCriteria.Page, pageSortCriteria.ItemsPerPage);
        }

        #endregion


        #region LinqKit Helpers

        public static IOrderedQueryable<T> OrderBy<T>(this IQueryable<T> source, string property)
        {
            return ApplyOrder<T>(source, property, "OrderBy");
        }
        public static IOrderedQueryable<T> OrderByDescending<T>(this IQueryable<T> source, string property)
        {
            return ApplyOrder<T>(source, property, "OrderByDescending");
        }
        public static IOrderedQueryable<T> ThenBy<T>(this IOrderedQueryable<T> source, string property)
        {
            return ApplyOrder<T>(source, property, "ThenBy");
        }
        public static IOrderedQueryable<T> ThenByDescending<T>(this IOrderedQueryable<T> source, string property)
        {
            return ApplyOrder<T>(source, property, "ThenByDescending");
        }
        static IOrderedQueryable<T> ApplyOrder<T>(IQueryable<T> source, string property, string methodName)
        {
            string[] props = property.Split('.');
            Type type = typeof(T);
            ParameterExpression arg = Expression.Parameter(type, "x");
            Expression expr = arg;
            foreach (string prop in props)
            {
                // use reflection (not ComponentModel) to mirror LINQ
                PropertyInfo pi = type.GetProperty(prop);
                expr = Expression.Property(expr, pi);
                type = pi.PropertyType;
            }
            Type delegateType = typeof(Func<,>).MakeGenericType(typeof(T), type);
            LambdaExpression lambda = Expression.Lambda(delegateType, expr, arg);

            object result = typeof(Queryable).GetMethods().Single(
                    method => method.Name == methodName
                            && method.IsGenericMethodDefinition
                            && method.GetGenericArguments().Length == 2
                            && method.GetParameters().Length == 2)
                    .MakeGenericMethod(typeof(T), type)
                    .Invoke(null, new object[] { source, lambda });
            return (IOrderedQueryable<T>)result;
        }

        #endregion

    }


    #region PredicateBuilder

    // Swapped out LinqKit for this Universal Predicate Builder (LinqKit, specifically AsExpandable dropped "Include" data)
    // more: http://petemontgomery.wordpress.com/2011/02/10/a-universal-predicatebuilder/
    public static class PredicateBuilder
    {
        /// <summary>
        /// Creates a predicate that evaluates to true.
        /// </summary>
        public static Expression<Func<T, bool>> True<T>() { return param => true; }

        /// <summary>
        /// Creates a predicate that evaluates to false.
        /// </summary>
        public static Expression<Func<T, bool>> False<T>() { return param => false; }

        /// <summary>
        /// Creates a predicate expression from the specified lambda expression.
        /// </summary>
        public static Expression<Func<T, bool>> Create<T>(Expression<Func<T, bool>> predicate) { return predicate; }

        /// <summary>
        /// Combines the first predicate with the second using the logical "and".
        /// </summary>
        public static Expression<Func<T, bool>> And<T>(this Expression<Func<T, bool>> first, Expression<Func<T, bool>> second)
        {
            return first.Compose(second, Expression.AndAlso);
        }

        /// <summary>
        /// Combines the first predicate with the second using the logical "or".
        /// </summary>
        public static Expression<Func<T, bool>> Or<T>(this Expression<Func<T, bool>> first, Expression<Func<T, bool>> second)
        {
            return first.Compose(second, Expression.OrElse);
        }

        /// <summary>
        /// Negates the predicate.
        /// </summary>
        public static Expression<Func<T, bool>> Not<T>(this Expression<Func<T, bool>> expression)
        {
            var negated = Expression.Not(expression.Body);
            return Expression.Lambda<Func<T, bool>>(negated, expression.Parameters);
        }

        /// <summary>
        /// Combines the first expression with the second using the specified merge function.
        /// </summary>
        static Expression<T> Compose<T>(this Expression<T> first, Expression<T> second, Func<Expression, Expression, Expression> merge)
        {
            // zip parameters (map from parameters of second to parameters of first)
            var map = first.Parameters
                .Select((f, i) => new { f, s = second.Parameters[i] })
                .ToDictionary(p => p.s, p => p.f);

            // replace parameters in the second lambda expression with the parameters in the first
            var secondBody = ParameterRebinder.ReplaceParameters(map, second.Body);

            // create a merged lambda expression with parameters from the first expression
            return Expression.Lambda<T>(merge(first.Body, secondBody), first.Parameters);
        }

        class ParameterRebinder : ExpressionVisitor
        {
            readonly Dictionary<ParameterExpression, ParameterExpression> map;

            ParameterRebinder(Dictionary<ParameterExpression, ParameterExpression> map)
            {
                this.map = map ?? new Dictionary<ParameterExpression, ParameterExpression>();
            }

            public static Expression ReplaceParameters(Dictionary<ParameterExpression, ParameterExpression> map, Expression exp)
            {
                return new ParameterRebinder(map).Visit(exp);
            }

            protected override Expression VisitParameter(ParameterExpression p)
            {
                ParameterExpression replacement;

                if (map.TryGetValue(p, out replacement))
                {
                    p = replacement;
                }

                return base.VisitParameter(p);
            }
        }
    }

    #endregion

}
