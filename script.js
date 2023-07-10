fetch('https://api.covidtracking.com/v1/us/current.json').then(res => res.json()).then(data => {
    const [result] = data;
    console.log(result)
    const {death,hospitalized,negative,pending,positive,deathIncrease} = result;
    new Chart(document.getElementById('pie-chart-1'), {
        type : 'pie',
        data : {
            labels : ["positive", "negative", "pending", "hospitalized", "death","deathIncrease"],
            datasets : [{
                backgroundColor : [  "#766696","#d22ab7",
                        "#2b87b3", "#2bdec7", "#113712","#fdf3d9" ],
                data : [`${positive}`, `${negative}`, `${pending}`, `${hospitalized}`, `${death}`,`${deathIncrease}`]
            }]
        },
        options : {
            title : {
                display : true,
                text : 'Pie Chart for admin panel'
            },
            responsive : true
        }
    });
})

document.getElementById('button-addon2').addEventListener('click', function(){
    const textSearch = document.getElementById('textSearch').value

    fetch('https://api.covidtracking.com/v1/states/current.json')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            data.forEach(element => {
                if(textSearch === element.state){
                    const {recovered, positive, negative, hospitalized, death} = element

                    // Destroy existing chart if it exists
                    if (window.myChart) {
                        window.myChart.destroy();
                    }

                    var chart = new Chart(document.getElementById('pie-chart-2'), {
                        type : 'pie',
                        data : {
                            labels : ["positive", "negative", "hospitalized", "recovered", "death"],
                            datasets : [{
                                backgroundColor : [  "#766696","#d22ab7",
                        "#2b87b3", "#2bdec7", "#113712"],
                                data : [positive, negative, hospitalized, recovered, death]
                            }]
                        },
                        options : {
                            title : {
                                display : true,
                                text : 'Pie Chart for admin panel'
                            },
                            responsive : true
                        }
                    });

                    // Store the new chart object
                    window.myChart = chart;
                }
            });
        });
});

    fetch('https://api.covidtracking.com/v1/us/daily.json')
      .then(response => response.json())
      .then(data => {
        const chartData = data; // Reverse data array for chronological order

        // Extract years and population values
        const years = chartData.map(entry => entry.date);
        const populations = chartData.map(entry => entry.positive);

        // Line Chart
        Highcharts.chart('lineChart', {
          title: {
            text: 'Current US values Of Covid-19'
          },
          xAxis: {
            categories: chartData.map(entry => entry.date)
          },
          yAxis: {
            title: {
              text: 'Covid-19 postive test result per day'
            }
          },
          series: [{
            name: 'Postive People of the Past 3 year',
            data: populations
          }]
        });
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });


      fetch('https://api.covidtracking.com/v1/states/current.json')
      .then(response => response.json())
      .then(data => {
        const chartData = data; // Reverse data array for chronological order

        // Extract years and population values
        const stateName = chartData.map(entry => entry.state);
        const PostiveCase = chartData.map(entry => entry.positive);

               // Bar Chart
               Highcharts.chart('barChart', {
          chart: {
            type: 'bar'
          },
          title: {
            text: 'Historic Value of Postive COvid Test Case in United State of America'
          },
          xAxis: {
            categories: stateName
          },
          yAxis: {
            title: {
              text: ''
            }
          },
          series: [{
            name: 'Postive Case',
            data: PostiveCase
          }]
        });
  
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });




//
