window.onload = () => {

    let header = document.createElement('div')
    header.id = 'header';
    header.innerHTML = '<h1> Countries/ Territories/ Areas </h1>';
    document.body.appendChild(header);

    let object;


    fRequest();

    function fRequest(){
      
      fetch(`https://i7.cs.hku.hk/~c3322a/2021_22/ASS2/getdata.php`)
          .then(response =>{

            if (response.status == 200){

              response.json().then( promise =>{


                let duplicate = JSON.stringify(promise);
                let promises = JSON.parse(duplicate);
                let object2;

                


                let content = document.createElement('div');
                content.id = 'content';
                document.body.appendChild(content);

                let navbar = document.createElement('div');
                navbar.className = 'navbar';
                content.appendChild(navbar);

                let search_div = document.createElement('div');
                search_div.id = 'search_div';
                navbar.appendChild(search_div);

                function search_input(){

                  // do not display the button and the status bar
                  dropdown.style.display = 'none';
                  dropdown2.style.display = "none";
                  status_1.style.display = 'none';
                  status_1_info.style.display = 'none';
                  status_2.style.display = 'none';
                  status_2_info.style.display = 'none';
                  clear.style.display = 'inline';

                }


                let status_1_info_store;

                let search = document.createElement('input');
                search.id = 'search';
                search.type = 'text';
                search.placeholder = 'search...';
                
                search.onclick = search_input;
                search.onkeyup = function() {

                  if (event.key == "Enter"){

                    let temp_object = [];

                    let a = search.value.toLowerCase();

                    // if object2 is undefined
                    if (typeof object2 === "undefined"){
                      for (let x in object){

                        let b = object[x].name.toLowerCase();
                        
                        if (b.includes(a)){
                          temp_object.push(object[x]);
                        }
                      }
                    }
                    // if object2 is defined
                    else{
                      for (let x in object2){
                        let b = object2[x].name.toLowerCase();

                        if (b.includes(a)){
                          temp_object.push(object2[x]);
                        }
                      }
                    }


                    object2 = object; // store the sort and filter json in object2 
                    //console.log(object2);
                    //object = temp_object;

                    countries.innerHTML = "";
                    createView(temp_object);
                    //console.log(temp_object);

                    /*

                    if (status_1_info.innerHTML == "NAME"){
                      
                      order_by('name');
                    }
                    else if (status_1_info.innerHTML == "AREA"){
                      
                      order_by('area');
                    }
                    else if (status_1_info.innerHTML == "POPULATION"){
                      order_by('population');
                    }
                    */
                    if (status_1_info.innerHTML == 'AREA' || status_1_info.innerHTML == "NAME" || status_1_info.innerHTML == "POPULATION" ){
                      status_1_info_store = status_1_info.innerHTML;
                    }
                    

                    status_1_info.style.display = 'inline';
                    status_1_info.innerHTML = "SEARCH RESULTS: " + temp_object.length + " MATCH";


                  }

                };
                search_div.appendChild(search);

                let clear = document.createElement('button');
                clear.id = 'clear';
                clear.onclick = function(){
                  document.getElementById('search').value="";

                  dropdown.style.display = 'block';
                  dropdown2.style.display = "block";
                  status_1.style.display = 'inline';
                  status_1.innerHTML = 'ORDER BY';
                  status_1_info.style.display = 'inline';
                 
                  status_1_info.style.display = 'inline';
                  

                  if (status_1_info.innerHTML.includes("SEARCH")){
                    console.log(status_1_info_store);
                    status_1_info.innerHTML = status_1_info_store;
                  }

                  

                  status_2.style.display = 'inline';
                  status_2_info.style.display = 'inline';
                  clear.style.display = 'none';

                  
                  
                  if (typeof object2 === 'undefined')
                  {
                    console.log("yes");
                    
                  }else{
                    countries.innerHTML = "";
                    createView(object2);
                  }

                }


                clear.innerHTML = 'x';
                search_div.appendChild(clear);

                // function for region sort
                function region_sort(requirement)
                {
                  if (requirement == "all"){

                    countries.innerHTML = "";
                    object = JSON.parse(duplicate);

                    console.log("in all");
                    console.log(promises);
                    
                    // get the information of order by
                    // then get into the function order_by() to createView
                    let order = status_1_info.innerHTML;

                    if (order == "NAME"){
                      console.log("hello");
                      order_by('name');
                    }
                    else if (order == "AREA"){
                      console.log("enter 2");
                      order_by('area');
                    }
                    else if (order == "POPULATION"){
                      order_by('population');
                    }
                    
                    
                    //createView(object);
                    status_2_info.innerHTML = "ALL";
                  }

                  else if (requirement == 'africa'){

                      // create an array for storing selected element
                      let temp_object = [];

                      // sub the countries in Africa in temp_object
                      for (let x in promises){

                        if (promises[x].region == 'Africa')
                        {
                          temp_object.push(promises[x]); 
                        }
                      }

                      // delete content in countries
                      countries.innerHTML = "";
                      // sub the temp_object to object
                      object = temp_object;

                      let order = status_1_info.innerHTML;

                      if (order == "NAME"){
                        console.log("hello");
                        order_by('name');
                      }
                      else if (order == "AREA"){
                        console.log("enter 2");
                        order_by('area');
                      }
                      else if (order == "POPULATION"){
                        order_by('population');
                      }


                      /*
                      // show countries by relevant region
                      createView(object);
                      */

                      // change the Region info
                      status_2_info.innerHTML = "AFRICA";
                  }

                  else if (requirement == "americas"){

                      // create an array for storing selected element
                      let temp_object = [];

                      // sub the countries in Africa in temp_object
                      for (let x in promises){

                        if (promises[x].region == 'Americas')
                        {
                          temp_object.push(promises[x]); 
                        }
                      }

                      // delete content in countries
                      countries.innerHTML = "";
                      // sub the temp_object to object
                      object = temp_object;

                      
                      let order = status_1_info.innerHTML;

                      if (order == "NAME"){
                        console.log("hello");
                        order_by('name');
                      }
                      else if (order == "AREA"){
                        console.log("enter 2");
                        order_by('area');
                      }
                      else if (order == "POPULATION"){
                        order_by('population');
                      }

                      /*
                      // show countries by relevant region
                      createView(object);
                      */
                      // change the Region info
                      status_2_info.innerHTML = "Americas";
                  }

                  else if (requirement == "asia"){

                      // create an array for storing selected element
                      let temp_object = [];

                      // sub the countries in Africa in temp_object
                      for (let x in promises){

                        if (promises[x].region == 'Asia')
                        {
                          temp_object.push(promises[x]); 
                        }
                      }

                      // delete content in countries
                      countries.innerHTML = "";
                      // sub the temp_object to object
                      object = temp_object;

                      let order = status_1_info.innerHTML;

                      if (order == "NAME"){
                        console.log("hello");
                        order_by('name');
                      }
                      else if (order == "AREA"){
                        console.log("enter 2");
                        order_by('area');
                      }
                      else if (order == "POPULATION"){
                        order_by('population');
                      }

                      /*
                      // show countries by relevant region
                      createView(object);
                      */
                      // change the Region info
                      status_2_info.innerHTML = "Asia";
                  }

                  else if (requirement == "europe"){

                      // create an array for storing selected element
                      let temp_object = [];

                      // sub the countries in Africa in temp_object
                      for (let x in promises){

                        if (promises[x].region == 'Europe')
                        {
                          temp_object.push(promises[x]); 
                        }
                      }

                      // delete content in countries
                      countries.innerHTML = "";
                      // sub the temp_object to object
                      object = temp_object;

                      let order = status_1_info.innerHTML;

                      if (order == "NAME"){
                        console.log("hello");
                        order_by('name');
                      }
                      else if (order == "AREA"){
                        console.log("enter 2");
                        order_by('area');
                      }
                      else if (order == "POPULATION"){
                        order_by('population');
                      }

                      /*
                      // show countries by relevant region
                      createView(object);
                      */


                      // change the Region info
                      status_2_info.innerHTML = "Europe";
                  }

                  else if (requirement == "oceania"){

                      // create an array for storing selected element
                      let temp_object = [];

                      // sub the countries in Africa in temp_object
                      for (let x in promises){

                        if (promises[x].region == 'Oceania')
                        {
                          temp_object.push(promises[x]); 
                        }
                      }

                      // delete content in countries
                      countries.innerHTML = "";
                      // sub the temp_object to object
                      object = temp_object;

                      let order = status_1_info.innerHTML;

                      if (order == "NAME"){
                        console.log("hello");
                        order_by('name');
                      }
                      else if (order == "AREA"){
                        console.log("enter 2");
                        order_by('area');
                      }
                      else if (order == "POPULATION"){
                        order_by('population');
                      }

                      /*
                      // show countries by relevant region
                      createView(object);
                      */
                      // change the Region info
                      status_2_info.innerHTML = "Oceania";
                  }

                  else if (requirement == "polar"){

                      // create an array for storing selected element
                      let temp_object = [];

                      // sub the countries in Africa in temp_object
                      for (let x in promises){

                        if (promises[x].region == 'Polar')
                        {
                          temp_object.push(promises[x]); 
                        }
                      }

                      // delete content in countries
                      countries.innerHTML = "";
                      // sub the temp_object to object
                      object = temp_object;

                      let order = status_1_info.innerHTML;

                      if (order == "NAME"){
                        console.log("hello");
                        order_by('name');
                      }
                      else if (order == "AREA"){
                        console.log("enter 2");
                        order_by('area');
                      }
                      else if (order == "POPULATION"){
                        order_by('population');
                      }

                      /*
                      // show countries by relevant region
                      createView(object);
                      */
                      // change the Region info
                      status_2_info.innerHTML = "Polar";
                  }
                }

                
                let dropdown = document.createElement('div');
                dropdown.className = 'dropdown';
                navbar.appendChild(dropdown);

                // drop down button 'by region'
                let dropbtn = document.createElement('button');
                dropbtn.className = 'dropbtn';
                dropbtn.innerHTML = 'By Region';
                dropdown.appendChild(dropbtn);

                let dropdown_content = document.createElement('div');
                dropdown_content.className = 'dropdown-content';
                dropbtn.appendChild(dropdown_content);

                let all = document.createElement('a');
                all.href = '#all';
                all.onclick = function() { region_sort("all") };
                all.innerHTML = 'All';
                dropdown_content.appendChild(all);

                let africa = document.createElement('a');
                africa.href = '#africa';
                africa.onclick = function() { region_sort("africa") };
                africa.innerHTML = 'Africa';
                dropdown_content.appendChild(africa);

                let americas = document.createElement('a');
                americas.href = '#americas';
                americas.onclick = function() { region_sort("americas") };
                americas.innerHTML = 'Americas';
                dropdown_content.appendChild(americas);

                let asia = document.createElement('a');
                asia.href = '#asia';
                asia.onclick = function() { region_sort("asia") };
                asia.innerHTML = 'Asia';
                dropdown_content.appendChild(asia);


                let europe = document.createElement('a');
                europe.href = '#europe';
                europe.onclick = function() { region_sort("europe") };
                europe.innerHTML = 'Europe';
                dropdown_content.appendChild(europe);

                let oceania = document.createElement('a');
                oceania.href = '#oceania';
                oceania.onclick = function() { region_sort("oceania") };
                oceania.innerHTML = 'Oceania';
                dropdown_content.appendChild(oceania);

                let polar = document.createElement('a');
                polar.href = '#polar';
                polar.onclick = function() { region_sort("polar") };
                polar.innerHTML = 'Polar';
                dropdown_content.appendChild(polar);


                function order_by(requirement){

                    // store the unsorted data
                    let sorted = [];
                    let temp_object = [];
                    
                    // get the latest list
                    

                    // for sorted by area
                    if (requirement == 'area'){

                      //console.log(promises);

                      let upto = -1;
                      //let del_json = object;

                      let del_json = object;

                      //console.log( object);
                      
                      for (let x in del_json)
                      {
                        sorted.push(del_json[x].area)
                      }
                      
                      // sort the order in DESC
                      sorted.sort(function(a,b) { 
                        return b - a;
                      });

                      // get each element in sorted[]
                      sorted.forEach(sort_country);
                      
                      // put the approipate country in temp_object
                      function sort_country(value, index, array){
                        
                        for (let x in del_json){

                          // sub countries which has area to temp_object[]
                          if ((value == del_json[x].area) && (del_json[x].area)){
                            temp_object.push(del_json[x]);
                            upto = upto + 1;
                            delete del_json[x];
                            break;
                          }
                         }   
                      }
                      // put the remaining into temp_object

                      if (del_json.length > 0)
                      {
                        for (let x in del_json){
                          
                          temp_object.push(del_json[x]);
                          delete del_json[x];
                        }
                      }

                      //object = temp_object;

                      countries.innerHTML = "";
                      object = temp_object;
                      //console.log(object);
                      createView(object);
                      status_1_info.innerHTML = "AREA"


                      

                    }

                    if (requirement == 'name'){

                      let del_json = object;

                      //console.log(del_json);

                      for (let x in del_json)
                      {
                        sorted.push(del_json[x].name)
                      }

                      sorted.sort()

                      //console.log(sorted);

                      // get each element in sorted[]
                      sorted.forEach(sort_country);

                      // put the approipate country in temp_object
                      function sort_country(value, index, array){
                        
                        for (let x in del_json){

                          // sub countries which has area to temp_object[]
                          if ((value == del_json[x].name)){
                            temp_object.push(del_json[x]);
                            break;
                          }
                        }   
                      }

                      //console.log(temp_object);

                      countries.innerHTML = "";
                      status_1_info.innerHTML = "NAME";
                      object = temp_object;
                      createView(object);

                    }

                    if (requirement == 'population'){
                      

                    
                      //let del_json = object;

                      let del_json = object;

                      console.log(promises);
                      
                      for (let x in del_json)
                      {
                        sorted.push(del_json[x].population)
                      }
                      
                      // sort the order in DESC
                      sorted.sort(function(a,b) { 
                        return b - a;
                      });

                      console.log(sorted);

                      // get each element in sorted[]
                      sorted.forEach(sort_country);
                      
                      // put the approipate country in temp_object
                      function sort_country(value, index, array){
                        
                        for (let x in del_json){

                          // sub countries which has area to temp_object[]
                          if (value == del_json[x].population){
                            temp_object.push(del_json[x]);
                            break;
                          }
                        }   
                      }

                      console.log(temp_object);

                      countries.innerHTML = "";
                      status_1_info.innerHTML = "POPULATION";
                      //status_2_info.innerHTML = "ALL"
                      object = temp_object;
                      createView(object);


                    }

                }


                // set up button for sort by
                
                let dropdown2 = document.createElement('div');
                dropdown2.className = 'dropdown';
                navbar.appendChild(dropdown2);
                  
                let dropbtn2 = document.createElement('button');
                dropbtn2.className = 'dropbtn';
                dropbtn2.innerHTML = 'Sort by';
                dropdown2.appendChild(dropbtn2);  

                let dropdown_content2 = document.createElement('div');
                dropdown_content2.className = 'dropdown-content';
                dropbtn2.appendChild(dropdown_content2);



                let area = document.createElement('a');
                area.href = '#area';
                area.onclick = function() { order_by("area") };
                area.innerHTML = 'Area';
                dropdown_content2.appendChild(area);

                let name = document.createElement('a');
                name.href = '#name';
                name.onclick = function() {order_by("name")};
                name.innerHTML = 'Name';
                dropdown_content2.appendChild(name);

                let population = document.createElement('a');
                population.href = '#population';
                population.onclick = function() { order_by("population") };
                population.innerHTML = 'Population';
                dropdown_content2.appendChild(population);



                // create status bar and status
                

                let status_bar = document.createElement('div');
                status_bar.id = 'status_bar';
                content.appendChild(status_bar);

                let status_1 = document.createElement('span');
                status_1.className = 'status_title';
                status_1.innerHTML = 'ORDER BY: ';
                status_bar.appendChild(status_1);

                let status_1_info = document.createElement('span');
                status_1_info.className = 'status_info';
                status_bar.appendChild(status_1_info);
                status_1_info.innerHTML = "XXX"

                let status_2 = document.createElement('span');
                status_2.className = 'status_title';
                status_2.innerHTML = 'SHOWED REGION: ';
                status_bar.appendChild(status_2); 

                let status_2_info = document.createElement('span');
                status_2_info.className = 'status_info';
                status_bar.appendChild(status_2_info);
                status_2_info.innerHTML = "ALL"



                
                let countries = document.createElement('section');
                countries.id = 'countries';
                content.appendChild(countries);
              

                let lat = 'undefine';
                let long = 'undefine';

                object = promises;
                status_1_info.innerHTML = "Name";
                order_by('name');
                /*
                createView(object);
                
                status_2_info.innerHTML = "ALL";
                */



                

                // create the flag content
                function createView(object)
                {

                  for (let x in object){
                  

                    let country = document.createElement('div');
                    country.className = 'country';
                    countries.appendChild(country);

                    let flag = document.createElement('div');
                    flag.className = 'flag';
                    country.appendChild(flag);

                    
                    // adjust flag size
                    function checksize(event){
                      let img_h = event.target.naturalHeight;
                      let img_w = event.target.naturalWidth;

                      /*let a = img_h.toString();
                      let b = img_w.toString();

                      console.log("a: " + a);
                      console.log("b " + b);

                      flag_img.height = a;
                      flag_img.wide = b;*/

                      if(img_h == 0)
                      {
                        a = 200;
                        flag_img.height = img_h.toString();
                        return;
                      }
                      else if (img_w / img_h >= 1.5)
                      {
                        a = 300 * img_h / img_w;
                        
                        flag_img.height = a.toString();
                      }
                      else{
                        b = 200 * img_w / img_h;
                        flag_img.width = b.toString();
                      }
                      
                      return;
                    }

                    let flag_img = document.createElement('img');
                    flag_img.src = object[x].flag;
                    flag_img.onload = function() {checksize(event)};
                    flag.appendChild(flag_img);

                    

                    let info = document.createElement('div');
                    info.className = 'info';
                    country.appendChild(info);

                    let country_info1 = document.createElement('p');
                    country_info1.id = 'country_name';
                    country_info1.innerHTML = object[x].name ;
                    info.appendChild(country_info1);
                    
                    let country_info2 = document.createElement('p');
                    country_info2.className = 'country_info';
                    country_info2.innerHTML = '<b>Country population: </b>' + object[x].population;
                    info.appendChild(country_info2);
                    
                    let country_info3 = document.createElement('p');
                    country_info3.className = 'country_info';
                    country_info3.innerHTML = '<b>Area: </b>' + object[x].area + " km &#178";
                    info.appendChild(country_info3);
                    
                    let country_info4 = document.createElement('p');
                    country_info4.className = 'country_info';
                    country_info4.innerHTML = '<b>Region: </b>' + object[x].region;
                    info.appendChild(country_info4);
                    
                    let country_info5 = document.createElement('p');
                    country_info5.className = 'country_info';
                    country_info5.innerHTML = '<b>Subregion: </b>' + object[x].subregion;
                    info.appendChild(country_info5);

                    let country_info6 = document.createElement('div');
                    country_info6.className = 'country_info';
                    info.appendChild(country_info6);
                    
                    
                    if (typeof object[x].latlng != 'undefined'){
                        lat = object[x].latlng[0];
                        long = object[x].latlng[1];
                    }
                    
                    
                    // function is create to identify each lat and long
                    function show_lag_long(lat, long, area){
                        country_info9.onclick = function(){
                          
                          if (big_map_layer.style.display == 'none'){
                            big_map_layer.style.display = 'block';
                          }

                          
                          abc.getView().setCenter(ol.proj.fromLonLat([long, lat]));
                          let zoom_factor = 11 - (Math.log10((area/ (16 - Math.log10(area)))));
                          console.log("zoom: " + zoom_factor);
                          abc.getView().setZoom(zoom_factor);

                        };
                    }
                    
                    let country_info7 = document.createElement('span');
                    country_info7.className = 'country_info';
                    country_info7.innerHTML = '<b>Lat: </b>' + lat;
                    country_info6.appendChild(country_info7);

                    let country_info8 = document.createElement('span');
                    country_info8.className = 'country_info';
                    country_info8.innerHTML = '<b>Lng: </b>' + long;
                    country_info6.appendChild(country_info8);
                    
                    let country_info9 = document.createElement('button');
                    country_info9.className = 'country_info';
                    country_info9.innerHTML = 'map';
                    country_info6.appendChild(country_info9);
                    show_lag_long(lat, long, object[x].area);
                    

                    let country_info10 = document.createElement('div');
                    country_info10.className = 'country_info';
                    info.appendChild(country_info10);

                    let country_info11 = document.createElement('span');
                    country_info11.className = 'country_info';
                    country_info11.innerHTML = '<b>Code:</b> ' + object[x].alpha3Code;
                    country_info10.appendChild(country_info11);
                    
                    let country_info12 = document.createElement('span');
                    country_info12.className = 'country_info';
                    country_info12.innerHTML = '<b>Calling Code:</b> ' + object[x].callingCodes[0];
                    country_info10.appendChild(country_info12);
                    
                  
                    
                  }

                }

                



                // get the width and height for the map layer
                var w = (window.innerWidth * 0.6).toString() +'px';
                var h = (window.innerHeight * 0.6).toString() +'px';

                // store the map and close button
                let big_map_layer = document.createElement('div');
                big_map_layer.id = 'big_map_layer';
                big_map_layer.style.width = w;
                big_map_layer.style.height = h;
                //big_map_layer.style.display = 'none';
                content.appendChild(big_map_layer);

                // create close button
                let close_btn = document.createElement('button');
                close_btn.id = 'close_btn';
                close_btn.innerHTML = 'Close';
                big_map_layer.appendChild(close_btn);
                close_btn.onclick = function(event){big_map_layer.style.display = 'none';}

                // create map layer for storing map
                let map_layer = document.createElement('div');
                map_layer.id = 'map_layer';
                map_layer.style.width = w;
                map_layer.style.height = h;
                big_map_layer.appendChild(map_layer);

                var abc = new ol.Map({
                    target: 'map_layer',
                    layers: [
                      new ol.layer.Tile({
                        source: new ol.source.OSM()
                      })
                    ],
                    view: new ol.View({
                      center: ol.proj.fromLonLat([63, 33]),
                      zoom: 4
                    })
                  });

                big_map_layer.style.display = 'none';

                // https://www.youtube.com/watch?v=XEhR_EfKI7o&ab_channel=AliHossain
                // https://openlayers.org/en/latest/doc/quickstart.html
                
                


                
                
              });
            }
            else {
              console.log("HTTPf return status: " + response.status);
            }
          })
          .catch(err =>{
            console.log("Fetch Error!");
          }); 
          


          
    }


}