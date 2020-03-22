/*
Author: Daniel Rosel
Date: 3/22/2020
*/
import React from 'react';
import styled from 'styled-components'
import $ from 'jquery';
const Title = styled.h2`
text-align: center;`
const Data = styled.p``

const Update = styled.button`
border-style: solid;
border-color: light-blue;
border-width: 0.01cm;
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
var totalC = ""
var countryID = 44;
var countries = ""
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
}
function redo() {
 countryID = $("#dropDown :selected").val()
 update() 
}
function App() {
  return (
    <div className="App">
      <Title>
        COVID-19 Counter
      </Title>
      <div class="container">
        <div class="wrapper">
          <div class="row">
            <div class="col-sm-4">

            </div>
            <div class="col-sm-4">
            <Data>
        <center>
          <select id="dropDown"></select><Update onClick={redo}>Find</Update>
        <table>
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
        </center>
      </Data>
            </div>
            <div class="col-sm-4">
<h4>
  <center>
    YOUR ADDVERTISMENT HERE
  </center>
</h4>
            </div>            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
