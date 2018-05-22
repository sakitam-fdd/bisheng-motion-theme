export function getLocalizedPathname(path, zhCN) {
  const pathname = path.startsWith('/') ? path : `/${path}`;
  if (!zhCN) {
    return (/\/?index-cn/.test(pathname) ? '/' : pathname.replace('-cn', '')
    );
  } else if (pathname === '/') {
    return '/index-cn';
  } else if (pathname.endsWith('/')) {
    return pathname.replace(/\/$/, '-cn/');
  }
  return `${pathname}-cn`;
}