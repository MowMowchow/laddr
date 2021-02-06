import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {Bar} from 'react-chartjs-2';
import './Results.css';


function Results(){
  let [mount, set_mount] = useState(false);
  let [age, set_age] = useState(18);
  let [retirement_age, set_retirement_age] = useState(65);
  let [sex, set_sex] = useState('total');
  let [field, set_field] = useState('Education');
  let [data, set_data] = useState({})
  let [graph_data, set_graph_data] = useState({})
  let [max_option, set_max_option] = useState();


  const graph_styling = {
    maintainAspectRatio: false,
    legend: {
      display: true,
      labels: {
          fontColor:'#020606',
          fontSize: 34
      }
    },scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Annual Income',
          fontColor: '#020606',
          fontSize: '26',
          fontFamily: 'Poppins',
        }, ticks: {
          beginAtZero: true,
          fontColor: '#020606',
          fontSize: '15',
          fontFamily: 'Poppins',
          callback: (value, index, values) => {
            return '$'+value;
        }

        }
      }], xAxes: [{
        scaleLabel: {
        display: true,
        labelString: 'Degree Level',
        fontColor: '#020606',
        fontSize: '26',
        fontFamily: 'Poppins',
        },ticks: {
          fontColor: '#020606',
          fontSize: '15',
          fontFamily: 'Poppins',

          callback: (label, index, labels) => {
            if (/\s/.test(label)) {
              return label.split(" ");
            }else{
              return label;
            }              
          }        
        }
      }]
    }, tooltips: {
      callbacks: {
        label:(tooltipItem, chartData) => {
          return '$'+tooltipItem.yLabel
        }
      }
    }
  }


  let get_field_data = async (event) => {
    event.preventDefault();
    await fetch('http://localhost:3001/get_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'field':field})
    })
    .then(response =>
      response.json()
    )
    .then(temp_data => {
      set_data(temp_data);
      return temp_data;
    })
    .then(temp_data => set_graph_data({
        labels: temp_data[sex].map(option => option.Education_Level),
        datasets: [
          {
            label: 'Annual Income vs. Degree Level',
            backgroundColor: 'rgba(255, 107, 107,0.2)',
            borderColor: 'rgba(255, 107, 107,1)',
            borderWidth: 2,
            hoverBackgroundColor: 'rgba(255, 107, 107,.5)',
            hoverBorderColor: 'rgba(255, 107, 107,1)',
            data: temp_data[sex].map(option => option.Annual_Income)
          }
        ]
      })
   );
  }

  
  let calc_retirement_salary = async () => {
    let best_option = {education_level: "temp", total_income: 0, annual_income: 0};
    data[sex].forEach(option => {
      let salary = option.Annual_Income, total_salary = salary;
      for (let i = 0; i < (retirement_age-age)-1; i++){
        salary *= 1.03;
        total_salary += salary;
      } 
      if (total_salary > best_option.total_income){
        best_option.education_level = option.Education_Level;
        best_option.annual_income = option.Annual_Income;
        best_option.total_income = total_salary;
      }
    });
    set_max_option(best_option);
  }


  useEffect(() => {
    (mount && age && sex !== 'Choose Here' && field !== 'Choose Here'? calc_retirement_salary() : set_mount(true));
  }, [data, retirement_age, age]);




  return(
    <div className="results-page-container">
      <div className="laddr-header-container">
        <Link to="/">          
          <h1 className="laddr-header">Laddr</h1>
        </Link>
      </div>

      <div className="fields-container">
        <form className="fields-form-container" onSubmit={get_field_data}>
          <label className="age-label">
              Age
            <input 
                name="age" 
                className="age-input" 
                placeholder="age" 
                value={age}
                onChange={e => set_age(e.target.value)}
            />
          </label>

          <label className="sex-label">
            Sex
            <select
              value={sex}
              onChange={e => set_sex(e.target.value)}
              className="sex-input"
            >
              <option value="total">Total</option>
              <option value="female">Female</option>
              <option value="male">Male</option> 
            </select>
          </label>


          <label className="fields-label">
            Fields of Study 
            <select
              value={field}
              onChange={e => set_field(e.target.value)}
              className="fields-input"
            >
              <option value="Education">Education</option>
              <option value="Visual and performing arts, and communications technologies">Arts & Communications</option>
              <option value="Social and behavioral sciences and law">Social/Behavioral Sciences & Law</option>
              <option value="Business, management and public administration">Business/Management & Public Administration</option>
              <option value="Mathematics, computer and information sciences">Mathemamatics/IT</option>
              <option value="Architecture, engineering, and related technologies">Architecture/Engineering</option>
              <option value="Agriculture, natural resources and conservation">Agriculture/Natural Resources</option>
              <option value="Health and related fields ">Health/Related fields </option>
              <option value="Personal, protective and transportation services ">Personal/Protective/Transportation Services </option>
              <option value="Physical and life sciences and technologies">Physical & Life Sciences</option>
              <option value="Other instructional programs ">Other</option>
            </select>
          </label>

          <button type="submit" className="submit-btn" onClick={get_field_data}>
            Submit
          </button>
         </form>
      </div>


      <div className={max_option && field !== 'Choose Here' && sex !== 'Choose Here'? "hide":"submit-prompt-container"}>
        <h1 className="submit-prompt">Please Submit Information for Results</h1>
      </div>
      <div className={max_option && field !== 'Choose Here' && sex !== 'Choose Here'? "results-container":"hide"}>
        <div className="results-container-top">
          <div className="controls-container">

            <div className="retirement-age-slider-container">
              <label className="retirement-age-label">
                Retirement Age: {retirement_age}
              </label>
              <input 
                name="retirement-age" 
                type="range" 
                min="18" 
                max="100" 
                value={retirement_age}
                onChange={e => {
                    if (max_option && field !== 'Choose Here' && sex !== 'Choose Here'){
                      set_retirement_age(e.target.value);
                    }
                  } 
                }
                className="retirement-input"
              />
            </div>
          </div>

          <div className="best-option-container">
            <p className="best-option-result">
              The Degree Level For You: 
              {max_option && field !== 'Choose Here' && sex !== 'Choose Here'? " " + max_option.education_level :" Please Submit"}

            </p>
            <p className="best-option-text">
              Maximum Accumulative Income:  
              {max_option && field !== 'Choose Here' && sex !== 'Choose Here'? " $" + Math.round(max_option.total_income) :" Please Submit"}
            </p>
            <p className="best-option-info">
              *The total income earned over your employment career, from age {age} to {retirement_age}.
            </p>
          </div>
        </div>

        <div className="chart-container">
            {max_option && field !== 'Choose Here' && sex !== 'Choose Here'? 
            <Bar
              data={graph_data}
              className="graph"
              options={graph_styling}
            /> 
            :" Please Submit for Graph"}
        </div>
      </div>
    </div>
  )
}

export default Results;