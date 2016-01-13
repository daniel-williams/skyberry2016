using System;
using System.Security.Cryptography;
using System.Text;

namespace Skyberry.Core
{
    public class IdGen
    {
        private static readonly IdGen _instance = new IdGen();

        // 0, 1, O, I omitted intentionally giving 32 (2^5) symbols
        private static char[] _charMap = { '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' };
        private static int _byteSize = 0x100;

        private RNGCryptoServiceProvider _provider = new RNGCryptoServiceProvider();

        #region Public Methods

        public static string NewId()
        {
            return _instance.GetBase32UniqueId(20, _charMap);
        }

        public static string NewId(int length)
        {
            return _instance.GetBase32UniqueId(length, _charMap);
        }

        #endregion

        #region Private Methods

        private IdGen()
        {
        }

        private void GetNext(byte[] bytes)
        {
            _provider.GetBytes(bytes);
        }

        private static string NewId(int length, string allowedChars)
        {
            char[] customMap = allowedChars.ToCharArray();
            return _instance.GetBase32UniqueId(length, customMap);
        }

        private string GetBase32UniqueId(int length, char[] allowedCharSet)
        {
            if (length < 0) throw new ArgumentOutOfRangeException("length", "length cannot be less than zero.");
            if (_byteSize < allowedCharSet.Length) throw new ArgumentException(String.Format("allowedChars may contain no more than {0} characters.", _byteSize));

            using (var rng = new System.Security.Cryptography.RNGCryptoServiceProvider())
            {
                var result = new StringBuilder();
                var buf = new byte[128];
                while (result.Length < length)
                {
                    rng.GetBytes(buf);
                    for (var i = 0; i < buf.Length && result.Length < length; ++i)
                    {
                        var outOfRangeStart = _byteSize - (_byteSize % allowedCharSet.Length);
                        if (outOfRangeStart <= buf[i]) continue;
                        result.Append(allowedCharSet[buf[i] % allowedCharSet.Length]);
                    }
                }
                return result.ToString();
            }
        }

        #endregion
    }
}
