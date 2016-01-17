

export function getBootstrapBreakpoint(useXxs = false, includeScrollbar = false) {
  let breakpoint = useXxs ? 'xxs' : 'xs';
  let width = includeScrollbar ? window.innerWidth : window.outerWidth;

  if (width >= 480 && width < 768) {
      breakpoint = 'xs';
  }
  else if (width >= 768 && width <= 992) {
      breakpoint = 'sm';
  }
  else if (width > 992 && width <= 1200) {
      breakpoint ='md';
  }
  else if (width > 1200)  {
      breakpoint = 'lg';
  }

  return breakpoint;
}
