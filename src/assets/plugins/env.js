/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * 
 */

let baseUrl = ''; 


if (process.env.NODE_ENV == 'development') {
	/*http://book.hpjy.gov.cn*/
	 baseUrl = 'http://book.hpjy.gov.cn';
	
}else if(process.env.NODE_ENV == 'production'){
	baseUrl = 'http://127.0.0.1';
	//baseUrl = 'http://book.hpjy.gov.cn';
}

export {
	baseUrl
}