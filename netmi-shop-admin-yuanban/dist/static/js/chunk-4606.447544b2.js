(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-4606"],{119:function(n,t){},zd34:function(n,t,e){"use strict";e.r(t),e.d(t,"export_txt_to_zip",function(){return r});var i=e("fDnD"),o=e.n(i);function r(n,t,e,i){var r=new o.a,c=e||"file",f=i||"file",u=n+"\r\n";t.forEach(function(n){var t;t=n.toString(),u+=t+"\r\n"}),r.file(c+".txt",u),r.generateAsync({type:"blob"}).then(function(n){saveAs(n,f+".zip")},function(n){alert("导出失败")})}e("MnM9")}}]);