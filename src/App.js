import './App.css';
import React from 'react';
import saveAs from 'file-saver';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';

let header = ['Name', 'Population'];
let muischeader = ['Name', 'Genre', 'Year'];
let musicband = [
  {
    name: 'Heilung',
    genre: 'Folk',
    year: '2014',
  },
  {
    name: 'Wardruna',
    genre: 'Folk,ambient,nordric-folk',
    year: '2003',
  },
  {
    name: 'AC/DC',
    genre: 'Heavy Metal',
    year: '1981',
  },
  {
    name: 'Black Sabbath',
    genre: 'Heavy Metal',
    year: '1982',
  }];

let Cities = [
  { name: 'Kiev', population: '3000000' },
  { name: 'Lviv', population: '1000000' },
  { name: 'Odessa', population: '500000' },
  { name: 'Dnipro', population: '100000' },
  { name: 'Kharkiv', population: '200000' },
  { name: 'Zhytomyr', population: '300000' },
  { name: 'Vinnitsa', population: '400000' },
  { name: 'Kherson', population: '500000' },
  { name: 'Khmelnytskyy', population: '600000' },
  { name: 'Chernivtsi', population: '700000' },
  { name: 'Ivano-Frankivsk', population: '800000' },
  { name: 'Rivne', population: '900000' },
  { name: 'Ternopil', population: '1000000' },
  { name: 'Cherkasy', population: '1100000' },
  { name: 'Lutsk', population: '1200000' },
  { name: 'Bila Tserkva', population: '1300000' },
];
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<NavMenu />} />
          <Route
            exact
            path="/formwithphoto"
            element={<FormWithPhoto nickname="" email="" age="" />}
          />
          <Route path="/cities" element={<DisplayCities cities={Cities} header={header} />} />
          <Route path="/musicband" element={<MusicBand header={muischeader} bands={musicband} />} />
          <Route exact path="/form" element={<Form />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

function NotFound() {
  return <div>Not found</div>;
}

function NavMenu() {
  return (
    <div className="navMenu">
      <NavLink to="/formwithphoto" className={setActive}>
        Form with photo
      </NavLink>
      <NavLink to="/form" className={setActive}>
        Form
      </NavLink>
      <NavLink to="/cities" className={setActive}>
        Cities
      </NavLink>
      <NavLink to="/musicband" className={setActive}>
        Music band
      </NavLink>
    </div>
  );
}

const setActive = ({ isActive }) => (isActive ? 'active' : '');

function Form() {
  return (
    <div class="login-box">
      <h2>Login</h2>
      <form>
        <div class="user-box">
          <input type="text" name="" required="" />
          <label>Nickname</label>
        </div>
        <div class="user-box">
          <input type="email" name="" required="" />
          <label>Email</label>
        </div>
        <div class="user-box">
          <input type="number" name="" required="" />
          <label>Age</label>
        </div>
        <div class="user-box">
          <select name="gender">
            <option value="none" selected>
              Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">other</option>
          </select>
        </div>
        <div className="user-box">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}

class FormWithPhoto extends React.Component {
  constructor(props) {
    super(props);
    let nickname = props.nickname;
    let email = props.email;
    let age = props.age;
    let nameIsValid = this.validateName(nickname);
    let emailIsValid = this.validateEmail(email);
    let ageIsValid = this.validateAge(age);
    this.state = {
      nickname: nickname,
      email: email,
      age: age,
      nameIsValid: nameIsValid,
      emailIsValid: emailIsValid,
      ageIsValid: ageIsValid,
      image: null,
      imageUrl: null,
    };
    this.onNameChange = this.onNameChange.bind(this);
    this.onAgeChange = this.onAgeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  validateAge(age) {
    return age >= 0;
  }
  validateName(name) {
    return name.length > 2;
  }
  validateEmail(email) {
    return email.includes('@');
  }
  onNameChange(e) {
    let nickname = e.target.value;
    let nameIsValid = this.validateName(nickname);
    this.setState({
      nickname: nickname,
      nameIsValid: nameIsValid,
    });
  }
  onAgeChange(e) {
    let age = e.target.value;
    let ageIsValid = this.validateAge(age);
    this.setState({
      age: age,
      ageIsValid: ageIsValid,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    let { nickname, email, age, nameIsValid, emailIsValid, ageIsValid } =
      this.state;
    if (nameIsValid && emailIsValid && ageIsValid) {
      let data = {
        nickname: nickname,
        email: email,
        age: age,
      };
      this.saveData(data);
    }
  }
  saveData(data) {
    let blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    saveAs(blob, 'data.json');
  }

  render() {
    var nameColor = this.state.nameValid === true ? 'green' : 'red';
    var emailColor = this.state.emailValid === true ? 'green' : 'red';
    var ageColor = this.state.ageValid === true ? 'green' : 'red';

    return (
      <form onSubmit={this.handleSubmit}>
        <p>
          <br />
          <input
            type="text"
            value={this.state.name}
            onChange={this.onNameChange}
            style={{ borderColor: nameColor }}
            placeholder="Nickname"
          />
        </p>
        <p>
          <input
            type="email"
            value={this.state.email}
            onChange={this.onEmailChange}
            style={{ borderColor: emailColor }}
            placeholder="Email"
          />
        </p>
        <p>
          <br />
          <input
            type="number"
            value={this.state.age}
            onChange={this.onAgeChange}
            style={{ borderColor: ageColor }}
            placeholder="Age"
          />
        </p>
        <p>
          <input type="file" name="file" />
        </p>
        <p>
          <br />
          <input type="submit" value="Submit" />
        </p>
      </form>
    );
  }
}

class DisplayCities extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      header:[],
    };
  }
  componentDidMount() {
    this.setState({
      cities: this.props.cities,
      header: this.props.header,
    });
  }

  render() {
    return (
      <div>
        <h1>Cities</h1>
        <table>
          <thead>
            <tr>
              {this.state.header.map((item, index) => (
                <th key={index}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.state.cities.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.population}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}


class MusicBand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bands: [],
      header:[],
    };
  }
  componentDidMount() {
    this.setState({
      bands: this.props.bands,
      header: this.props.header,
    });
  }

  render() {
    return (
      <div>
        <h1>Music Band</h1>
        <table>
          <thead>
            <tr>
              {this.state.header.map((item, index) => (
                <th key={index}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.state.bands.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.genre}</td>
                <td>{item.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}




export default App;
