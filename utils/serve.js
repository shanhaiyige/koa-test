// 返回信息格式封装
exports.resdata=function (code, msg, data) {
    let _code = code ? code : '0000';
    let _msg = msg ? msg : 'success';
	let respon={
		'respHead':{
			'code': _code,
			'message': _msg
		},
		'respBody':data
	}
	return respon;
};

exports.errdata=function (err, code, msg) {
    let _code = code ? code : '9999';
    let _msg = msg ? msg : 'error';
	let respon={
		'respHead':{
			'code': _code,
            'message': _msg,
        },
        'respBody':{
            'err': err
        }
	}
	return respon;
};

exports.raw = function (args) {
	var keys = Object.keys(args);
	keys = keys.sort()
	var newArgs = {};
	keys.forEach(function (key) {
		newArgs[key.toLowerCase()] = args[key];
	});
  
	var string = '';
	for (var k in newArgs) {
		string += '&' + k + '=' + newArgs[k];
	}
	string = string.substr(1);
	return string;
  };
