/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        app.checkNetwork();
        app.tabs();
    },
    tabs: function(){
        var tabs = document.getElementById('tabs');
        var lis = tabs.getElementsByTagName('li');
        for(var i = 0; i < lis.length; i++) {
            var li = lis[i];
            li.onclick = function(){
                if (this.className == 'active') {
                    this.className = '';
                } else {
                    this.className = 'active';
                }
                var value = this.innerText.trim();
                var xhttp = new XMLHttpRequest();
                xhttp.open("GET", "http://192.168.2.168:9090/control?code=" + value, true);
                xhttp.send();
            };
        }
    },
    checkNetwork: function(callback){
        var tabs = document.getElementById('tabs');
        var loading = document.getElementById('loading');
        loading.innerHTML = '<h1 id="loading"><i class="fa fa-refresh fa-spin"></i> Loading Network Status...</h1>';
        var xhttp = new XMLHttpRequest();
        xhttp.timeout = 10;
        xhttp.onload = function() {

            if (this.status == 200) {
                app.hide(loading);
                app.show(tabs);
            } else {
                loading.innerHTML = "<i class='fa fa-frown-o'></i> You are not connected." + '<button id="connect"><i class="fa fa-refresh"></i> Try Again</button>';
                var button = document.getElementById('connect');
                button.onclick = function(){
                    app.initialize();
                };
            }
        };
        setTimeout(function(){
            xhttp.open("GET", "http://192.168.2.168:9090/dashboard", true);
            xhttp.send();
        }, 2000);
    },
    hide: function(e) {
        e.className = 'invisible';
    },
    show: function(e) {
        e.className = 'visible';
    }
};
