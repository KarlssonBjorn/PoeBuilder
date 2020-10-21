import React, { Component } from 'react';
import rp from 'request-promise';
import cheerio from 'cheerio';
import './App.css';

class App extends Component {
  state = { skills: [] };
  data_url = 'https://cors-anywhere.herokuapp.com/https://pathofexile.gamepedia.com/List_of_skill_gems';

  componentDidMount() {
    rp(this.data_url).then(html => {
      let skills = [];
      let $ = cheerio.load(html);

      $('span').filter('.c-item-hoverbox__activator').each(function(i, element) {
        let skill = $(this).prepend().text();
        skills.push(skill);
      });
      this.setState({ skills });
    }).catch(function(err) {
      console.log('crawl failed');
    });
    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ul>
            {this.state.skills.map(skill => {
              return <li key={skill}>{skill}</li>;
            })}
          </ul>
        </header>
      </div>
    );
  }
}

export default App;
