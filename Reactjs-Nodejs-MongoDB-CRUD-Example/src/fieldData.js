// import React, { Component } from 'react';

// class fieldData extends Component {

//     constructor(props) {
//         super(props);
//         this.state = { fields: [] };
//     }

//     componentDidMount() {

//             fetch('api/fields')
//             .then(response => response.json())
//             .then(data => {this.setState({ fields: data, isLoading: false })});
            
//     }
   

//     render() {
//         const { fields } = this.state;

      
//         const fieldsList=fields.map(a=>a.fieldName.map(f=><th >{f.nameField}</th>))
//         const promotionList = promotions.map(promotion => {
//             return <tr key = { promotion._id } >

//                 {fields.map(f=>f.fieldName.map(name=> {
//                  return       ( 
//                   <td > { promotion[name.nameField] } </td> 
//           )}))}     
//                </tr >
//         });
//         return ( 
//             <div >   
//                {promotionList}   
//            </ div >
//         );
//     }
// }

// export default fieldData;