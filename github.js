var name;
        var repoButton=document.getElementById('repositories');
        var followersButton=document.getElementById('followers');
        var followingsButton=document.getElementById('followings');
        const error1= document.getElementById('message');
        const error2=document.getElementById('enterValid');
        const userdiv=document.getElementById('wholeuser');
        var obj;
       function search()
       {
        name=document.getElementById('name').value;
        if(name!="")
        {
        document.getElementById('followMainDiv').style.visibility="hidden";
        userdiv.style.display="none";
            fetch('https://api.github.com/users/' + name)
                .then(res => res.json())
                .then(data => {
                    obj=data;
                    console.log(obj);
              // $('#dp').attr('src', data.avatar_url)
               document.getElementById('dp').src=data.avatar_url;
               
               if(obj.message=="Not Found")
               {
                    error1.innerHTML="User Not Found";
                    error2.innerHTML="Please Enter a Valid User Name";
                    userdiv.style.display="none";
                    document.getElementById("name").placeholder = "User Name";
               }
               else
               {
                   user();
                   document.getElementById("name").placeholder = "User Name";
               }
               
                })
            }
            else
            {
                document.getElementById("name").placeholder = "Type username before search";
            }
        }
        function user()
        {
            error1.innerHTML="";
            error2.innerHTML="";
            userdiv.style.display="block";
            document.getElementById('uname').innerHTML=obj.name;
            document.getElementById('email').innerHTML=obj.email;
            document.getElementById('userName').innerHTML=obj.login;
            document.getElementById('location').innerHTML=obj.location;
            repoButton.innerHTML="Repositories ("+obj.public_repos+")";
            followersButton.innerHTML="Followers ("+obj.followers+")";
            followingsButton.innerHTML="Followings ("+obj.following+")";
        }
        function followers()
        {
            var temp=document.getElementById('followMainDiv');
            temp.innerHTML="";
            var wholeData="";
            if(obj.followers==0)
            {
                wholeData="<h3>No Followers</h3>";
            }
            fetch(obj.followers_url)
            .then(res =>res.json())
            .then(data =>{
                console.log(data);
                data.forEach(function(loopData){
                    wholeData+=`<div id="follow"><img id="followimg" src="${loopData.avatar_url}" alt=""><div id="followDetail">
                    <div id="firstPart" style="float: left;">
                    <div class="first"><span>ID: </span><label class="dcolor">${loopData.id}</label></div>
                    <div class="second"><span>Username : </span><label class="dcolor">${loopData.login}</label></div>
                    <div class="second"><span>URL : </span><label class="dcolor">${loopData.url}</label></div>
                    <div class="second"><button class="but" id="nextSearch" onclick="nextSearch('${loopData.login}')">View Details</button></div>
                </div></div></div>`
                });
                document.getElementById('followMainDiv').innerHTML=wholeData;
                temp.style.visibility="visible";
            })
        }
        function following()
        {
            var temp=document.getElementById('followMainDiv');
            temp.innerHTML="";
            var wholeData="";
            if(obj.following==0)
            {
                wholeData="<h3 style='margin-left:28em'>Not Following Anyone</h3>";
            }
            fetch(obj.following_url.replace('{/other_user}',''))
            .then(res =>res.json())
            .then(data =>{
                console.log(data);
                data.forEach(function(loopData){
                    wholeData+=`<div id="follow"><img id="followimg" src="${loopData.avatar_url}" alt=""><div id="followDetail">
                    <div id="firstPart" style="float: left;">
                    <div class="first"><span>ID: </span><label class="dcolor">${loopData.id}</label></div>
                    <div class="second"><span>Username : </span><label class="dcolor">${loopData.login}</label></div>
                    <div class="second"><span>URL : </span><label class="dcolor">${loopData.url}</label></div>
                    <div class="second"><button class="but" id="nextSearch" onclick="nextSearch('${loopData.login}')">View Details</button></div>
                </div></div></div>`
                    
                });
                document.getElementById('followMainDiv').innerHTML=wholeData;
                temp.style.visibility="visible";
            })
        }
        function nextSearch(nxtname)
        {
            document.getElementById('name').value=nxtname;
            search();
        }
        function repositories()
        {
            var temp=document.getElementById('followMainDiv');
            temp.innerHTML="";
            var wholeData="";
            fetch(obj.repos_url)
            .then(res =>res.json())
            .then(data =>{
                data.forEach(function(loopData){
                    wholeData+=`<input type="button" class="but" id="repoLinks" value="${loopData.name}" onclick="window.open('${loopData.html_url}')">`
                });
                document.getElementById('followMainDiv').innerHTML=wholeData;
                temp.style.visibility="visible";
            })
        }