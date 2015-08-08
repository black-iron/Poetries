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
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
        if (Handler.Data == null)
            Handler.Data = window.sqlitePlugin.openDatabase({ name: "Data.db", createFromLocation: 1 });
        Handler.Data.transaction(function (tx) {
            tx.executeSql("select * from Poets order by Name", [], function (tx, res) {
                var listElement = $("#poetsList");
                listElement.html("");
                for (var i = 0; i < res.rows.length; i++) {
                    var item = res.rows.item(i);
                    var tag = createListItemTag(item);
                    listElement.append(tag);
                }
                listElement.listview('refresh');
            });
        });
        function createListItemTag(model) {
            var li = "<li>{0}</li>";
            var a = '<a href="poetries.html?id={Id}"><img src="img/persons/{Image}" onerror="this.onerror = null; this.src = \'img/PersonPlaceholder.png\';"/><h2>{Name}</h2></a>  ';
            a = a.replace("{Id}", model.Id).replace("{Image}",  model.Id.toString() + ".png").replace("{Name}", model.Name);
            li = li.replace("{0}", a);
            return li;
        }
        function UrlExists(u) {
            $.ajax({
                url: u,
                type: 'HEAD',
                error: function () {
                    return false;
                },
                success: function () {
                    return true;
                }
            });
        }
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {

    }
};

app.initialize();