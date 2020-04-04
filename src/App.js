/*
Author: Daniel Rosel
Date: 3/22/2020
*/

import React from 'react';
import styled from 'styled-components'
import $ from 'jquery';

const Title = styled.h2`
text-align: center;
padding-bottom: 0.8cm;
text-decoration: underline;
`
const Data = styled.p``
const dSrc = styled.p`
`
const Update = styled.button`
border-style: solid;
border-color: light-blue;
border-width: 0.01cm;
`
const DataSrc = styled.p`
padding-top: 2cm;
width: auto;
`
const WorldWideData = styled.p`
padding-bottom: 0.1cm;
`
var dataA = ""
var dataB = ""
fetch("https://api.covid19api.com/summary")  
  .then((response) => {
    return response.json();
  })
  .then((data) => {    
    //console.log(JSON.parse(data))
    dataA = $.parseJSON(JSON.stringify(data)) 
    dataB = dataA.Countries[countryID]
    countries = dataA.Countries
    update()
  });
const Graph = styled.p`
padding-top: 0.3cm;
width: 100%;
`
const Cases = styled.button`
background-color: red;
height: 0.4cm;
border-style: none;
`
const Dead = styled.button`
background-color: black;
height: 0.4cm;
border-style: none;
`
const Recover = styled.button`
background-color: green;
height: 0.4cm;
border-style: none;
`
const Healthy = styled.td`
background-color: green;
height: 0.4cm;

`
const Sick = styled.td`
background-color: red;
height: 0.4cm;
min-width: 0;
`
const GH = styled.tr`
width: 10cm;
`
var countryPop = 0  
var totalC = ""
var countryID = 0;
var countries = ""
var done = ""
var totalCasesWorldWide = 0
var totalDeathsWorldWide = 0
var totalRecoveriesWorldWide = 0
function wwl() {
  for (var x=0;x<countries.length;x++) {
    let country = countries[x].Country
    totalCasesWorldWide += dataA.Countries[x].TotalConfirmed
    totalDeathsWorldWide += dataA.Countries[x].TotalDeaths
    totalRecoveriesWorldWide += dataA.Countries[x].TotalRecovered
  }
  $("#totalCasesW td").html("Total Cases: " + totalCasesWorldWide)
  $("#totalDeathsW td").html("Total Deaths: " + totalDeathsWorldWide)
  $("#totalRecoveriesW td").html("Total Decoveries: " + totalRecoveriesWorldWide) 
  //pichart setup
  var deadthP =  totalDeathsWorldWide / totalCasesWorldWide
  var recP = totalRecoveriesWorldWide / totalCasesWorldWide
  var activeP = (totalCasesWorldWide - (totalRecoveriesWorldWide + totalDeathsWorldWide)) / totalCasesWorldWide
  $("#deadG").width(deadthP*50+"%")
  $("#recG").width(recP*50+"%")
  $("#casesG").width(activeP*50+"%")
  $("#deadGD").html("<b>Deaths of infected: </b>"+deadthP*100+"%")
  $("#recGD").html("<b>Recoveries of infected: </b>"+recP*100+"%")
  $("#casesGD").html("<b>Total active cases: </b>"+activeP*100+"%")
  $("#deadGD").attr("style", "background-color: black; color: white")
  $("#recGD").attr("style", "background-color: green; color: white")
  $("#casesGD").attr("style", "background-color: red; color: white")

}
function update() {  
  for (var x=0;x<countries.length;x++) {
    let country = countries[x].Country
    $("#dropDown").append("<option onClick='redo()' value='"+x+"'>"+countries[x].Country+"</option>")
  }
  $("#opt").remove(":contains('')")
  $("#country").html("Country: " + dataA.Countries[countryID].Country);
  $("#totalC").html("Total Cases: " + dataA.Countries[countryID].TotalConfirmed);
  $("#newC").html("New Cases: " + dataA.Countries[countryID].NewConfirmed);
  $("#totalD").html("Total Deaths: " + dataA.Countries[countryID].TotalDeaths);
  $("#newD").html("New Deaths: " + dataA.Countries[countryID].NewDeaths);
  $("#totalR").html("Total Recovered: " + dataA.Countries[countryID].TotalRecovered);
  $("#newR").html("New Recovered: " + dataA.Countries[countryID].NewRecovered);
  done = true
  clearWWD()
  wwl()
  countryPopulationDataGrpah()
}
function redo() {
 countryID = $("#dropDown :selected").val()
 update() 
}

function countryPopulationDataGrpah() {  
  let country = $("#dropDown :selected").html()
  country = country.toLowerCase()
  if (country != "") {
  fetch("https://restcountries.eu/rest/v2/name/"+country+"?fullText=true", {
    "method": "GET"})  
  .then((response) => {
    return response.json();
})
.then((data) => {
    countryPop = data
    countryPop = countryPop[0].population
    countryGraph(countryPop)
})
.catch(err => {
    console.log(err);
})
  }
  else {

  }
}

function clearWWD() {
  totalCasesWorldWide = 0
  totalDeathsWorldWide = 0
  totalRecoveriesWorldWide = 0
}
function countryGraph(pop) {
  $("#countryGraph").hide()

  var healthy = (pop) - dataA.Countries[countryID].TotalConfirmed         
  healthy = healthy / pop  
  var sick = (dataA.Countries[countryID].TotalConfirmed + dataA.Countries[countryID].TotalDeaths) / (pop)
  $("#CountryHealthy").width((100*healthy)*10+"%")          
  $("#countrySick").width((100*sick)*10+"%") 
  $("#countryGraph").show()
}
$(document).ready(function(){
  wwl()
  $("#countryGraph").hide()
  news() 
})

function news() {
  function showNews(dt) {  
    dt = dt.articles
    var a    
    var art_data=""
    for (a=0;a<10;a++) {      
      art_data=`
      <div class="col-sm-12">
      <h4 id="newsHeader">`+dt[a].title+`</h4>
      <p id="newsBody">`+dt[a].description+`<a href="`+dt[a].url+`">READ MORE</a></p ">
      </div>
      `
      $("#news").append(art_data)
    }
  }
  fetch("http://newsapi.org/v2/everything?q=covid-19&from=2020-04-02&to=2020-04-02&sortBy=popularity&apiKey=6e01631cc8db4df88d26ca0003428d77", {
    "method": "GET",

    "headers": {
      'Content-Type': 'application/json',      
      "Accept":"application/json",
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'

    }
  })
  .then((response) => {
    return response.json();
})
.then((data) => {
    showNews(data)
})
.catch(err => {
    console.log(err);
})
//
}
function App() {
  return (
    <div className="App">
      <Title>
        COVID-19 Intel
      </Title>
      <div class="container">
        <div class="wrapper">

          <div class="row">
            <div class="col-sm-5">
            <Data>
        <center>
          <select id="dropDown"></select><Update onClick={redo}>Find</Update>
        <table id="data-table">
          <b>          
          <tr id="country">
          </tr>
          </b>
          <tr id="totalC" class="Ca">
          </tr>
          <tr id="newC" class="Ca">
          </tr>
          <tr id="totalD" class="De">            
          </tr>
          <tr id="newD" class="De">
          </tr>
          <tr id="totalR" class="Re">          
          </tr>
          <tr id="newR" class="Re">            
          </tr>          
        </table>
        <Graph id="countryGraph">
          <table>
            <GH>
            <Healthy title="Healthy Population" id="CountryHealthy"></Healthy>
            <Sick title="Sick Population" id="countrySick"></Sick>
            </GH>
          </table>
        </Graph>
        </center>
      </Data>
            </div>
            <div class="col-sm-3">
            <WorldWideData>
           <table>
                <tr><h3>Worldwide Data</h3></tr> 
                <tr id="totalCasesW"><td></td></tr>
                <tr id="totalDeathsW"><td></td></tr>
                <tr id="totalRecoveriesW"><td></td></tr>
            </table>           
           </WorldWideData>
            </div>  
            <div class="col-sm-3">
            <h3>Worldwide Data Graph</h3>
            <Graph>
                  <Cases title="Active Cases" id="casesG"></Cases>
                  <Dead title="Deaths" id="deadG"></Dead>
                  <Recover title="Recoveries" id="recG"></Recover>
            </Graph>
            <table>
                    <tr><td id="casesGD"></td></tr>
                    <tr><td id="deadGD"></td></tr>
                    <tr><td id="recGD"></td></tr>
                  </table>
            </div>        
          </div>  
          <div id="chartContainer">                
              </div>
              <div class="row" id="news">

              </div>
          <DataSrc>
          
          <div class="row">
            
            <div class="col-sm-3">
              <dSrc>
              <h2>Data Sources</h2>
              </dSrc>
            </div>
            <div class="col-sm-9">
            <a href="https://covid19api.com">source API</a>
              <a href="https://github.com/CSSEGISandData/COVID-19">github repo...</a> <br>              
              </br>
                <p class="dtsc">
                  World Health Organization, DXY.cn, BNO News, National Health Commission of the People’s Republic of China, China CDC, Hong Kong Department of Health, Macau Government, Taiwan CDC, US CDC, Government of Canada, Australia Government Department of Health, European Centre for Disease Prevention and Control, Ministry of Health Singapore, Italy Ministry of Health, 1Point3Arces, WorldoMeters <br></br> News: https://newsapi.org
                </p>
            </div>
          </div>
          <p>Page Author - Daniel Rosel</p>
          </DataSrc>
        </div>
      </div>
    </div>
  );
}

export default App;
