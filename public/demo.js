$(function(){

  var api_root = 'https://api.iiot.oringnet.cloud';
  var demo_token = window.localStorage.getItem('demo_token');
  var thing_id = 'SycUzdGdM';

  if (demo_token) {
    $("#login_btn").hide();
    $("#login_content").show();
    app_init();
  }

  $("#login_btn").on('click', () => {
    // replace your app client id & redirect_uri
    $.oauthpopup({path:`${api_root}/v1/oauth/authorize?client_id=HJnzpHzdG&redirect_uri=http%3A%2F%2F127.0.0.1:3000%2Flogin.html&response_type=token&state=${random_state_creator()}`});
  });

  $('#get_thing_btn').on('click', () => {
    fetch(`${api_root}/v2/things/${thing_id}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${demo_token}`,
        'Content-Type': 'application/json',
       },
    }).then((r) => {
      r.json().then((d)=>{
        $("#thing_info pre").html(JSON.stringify(d.data, null, 4));
      })
    });
  });

  $("#get_thing_data").on('click', ()=> {
    getData();
  });

  function app_init () {
    fetch(`${api_root}/v1/me`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${demo_token}`,
        'Content-Type': 'application/json',
       },
    }).then((res) => {
      if (res.status > 399 && res.status < 500) {
        window.localStorage.removeItem('demo_token');
        window.location.reload();
      } else {
        res.json().then((d)=>{
          $("#user_info pre div").html(JSON.stringify(d, null, 4));
          $("#user_info .loading").hide();
        });
      }
    });
  }

  // security system
  // bad
  // demo only
  function random_state_creator () {
    return Math.random() * 100000000000000000;
  }

  function getData () {
    fetch(`${api_root}/v2/things/${thing_id}/data-buckets/sensorDatas/data-shapes/temperature/data?limit=50`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${demo_token}`,
        'Content-Type': 'application/json',
       },
    }).then((r) => {
      r.json().then((d)=>{
        draw(d.data);
      })
    });
  }


  function draw(data) {
    var color = Chart.helpers.color;
    var ctx = document.getElementById("myChart");
    var labels = data.map((d)=> new Date(d.recordAt));
    var data = data.map((d)=> d.value);

    var myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: "pm25",
            backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
            borderColor: window.chartColors.red,
            fill: false,
            data: data,
          }
        ]
      },
      options: {
        responsive: false,
        animation: false,
        scales: {
          xAxes: [{
            type: "time",
            time: {
              format: 'MM/DD/YYYY HH:mm',
              // round: 'day'
              tooltipFormat: 'll HH:mm'
            },
            scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }, ],
        }
      }
    });
  }

})
