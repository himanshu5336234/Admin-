import { Component } from 'react'
import axios from 'axios'
import "./App.css"


export default class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      id: 0,
      value:"",
      query: "",
      filter:[],
      active:false
    
    }
  }

  componentDidMount() {
    axios.get("http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D").then(response => {
      this.setState({ data: response.data })
      this.setState({filter:this.state.data})
    })
  }
  handleClick = (id) => {
   
    this.setState({ id: id, change: "block" ,})
  }

  handleInputChange=(e)=>{
  
  let filter=this.state.data.filter(res=>{return (res.firstName).toUpperCase().includes(e.target.value.toUpperCase())});
  this.setState({filter:filter}) 
  console.log(e.target.value)
  
  };
  render() {
 
    return (

      <main>

        <div id="table-section">

          <form action="/">
            <img src="" />
            <input type="text" placeholder="Enter something" onChange={this.handleInputChange} />
          </form>

          <div id="table-wrapper">

            <div id="table-headers">
              <table>
                <thead>
                  <tr>
                    <th className="column1">Id</th>
                    <th className="column2">FirstName</th>
                    <th className="column3">LastName</th>
                    <th className="column4">Email</th>
                    <th className="column5">Phone</th>
                  </tr>
                </thead>
              </table>
            </div>

            <div id="table-data">
              <table>
                <tbody>
                  {this.state.filter.map(item => <tr onClick={ ()=>this.handleClick(item.id)} key={item.id}  className="data-row ">
                    <td className="column1">{item.id} </td>
                    <td className="column2">{item.firstName}</td>
                    <td className="column3">{item.lastName}</td>
                    <td className="column4">{item.email}</td>
                    <td className="column5">{item.phone}</td>
                  </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>


        <div id="info-wrapper">
          <h1>Details</h1>
          <p>Click on a table item to get detailed information</p>

          {this.state.data.filter(re => re.id == this.state.id).map(item =>
            <div id="info-content" style={{ display: `${this.state.change}` }}>
              <div><b>User selected:</b> {item.firstName} {item.lastName}</div>
              <div>
                <b>Description: </b>
                <div id="para" >
                  {item.description}
                </div>
              </div>
              <div><b>Address:</b> {item.address.streetAddress}</div>
              <div><b>City:</b> {item.address.city}</div>
              <div><b>State:</b>{item.address.state}</div>
              <div><b>Zip:</b>{item.address.zip} </div>
            </div>
          )}

        </div>

      </main>
    )
  }
}
