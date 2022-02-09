import { isBrowser } from './isBroswer';

it('should return true to browser user agents', () => {
  const browserUAs = [
    //   chrome
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    // firefox
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0',
    // edge
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393',
    // internet explorer
    'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)',
    // safari
    'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
    // opera
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.81 Safari/537.36 OPR/83.0.4254.27',
  ];

  browserUAs.forEach((ua) => {
    const result = isBrowser(ua);
    expect(result).toBeTruthy();
  });
});

it('return false to not browser user agents', () => {
  const notBrowserUAs = [
    //  googlebot
    'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    // facebook
    'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
    // bingbot
    'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
    // twitter
    'Twitterbot/1.0',
  ];

  notBrowserUAs.forEach((ua) => {
    const result = isBrowser(ua);
    expect(result).toBeFalsy();
  });
});
