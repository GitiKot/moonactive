import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

  
class PromotionList extends Component {
    
    constructor(props) {
        super(props);
        this.state = { fields: [], promotions: [], isLoading: true , data: [],pageNo:1};
        this.remove = this.remove.bind(this);

        
    }
    
    componentDidMount() {

       
        this.setState({ isLoading: true , data: [],pageNo:1});

        fetch('api/promotions')
            .then(response => response.json())
            .then(data => this.setState({ promotions: data, isLoading: false , data: [],pageNo:1}));

            fetch('api/fields')
            .then(response => response.json())
            .then(data => {this.setState({ fields: data, isLoading: false , data: [],pageNo:1})});

           
    }

    async remove(id) {
        await fetch(`/api/promotion/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            console.log("Remove Done!");
            let updatedPromotions = [...this.state.promotions].filter(i => i._id !== id);
            this.setState({ promotions: updatedPromotions });
        });
    }

     getData(){
       
       
		axios.get(`https://jsonplaceholder.typicode.com/albums/${this.state.pageNo}/photos`)
			.then(response => {
				if(this.state.pageNo > 1){
                    let arr;
					// let arr = [...data, ...response.data];
					
					// setData(arr);
				}
				else{
                    
					// setData(response.data);
				}
				
			})
			.catch(error => {
				alert('Axios GET request failed');
			})
	}
	

    render() {
        const { fields, promotions, isLoading } = this.state;
      
const firstEvent = (e) => {
		console.log("eee",e);
		var bottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 30;
		if(bottom){
			let pg = this.state.pageNo + 1;
            this.setState({pageNo:pg})
			// setPageNo(pg);
			this.getData();
		}
	}

        if (isLoading) {
            return <p > Loading... </p>;
        }
        const fieldsList=fields.map(a=>a.fieldName.map(f=><th >{f.nameField}</th>))
        const promotionList = promotions.map(promotion => {
            return <tr key = { promotion._id } >

                {fields.map(f=>f.fieldName.map(name=> {
                   
                    if(name.type==='Date'){
                        if(promotion[name.nameField])
           return ( 
                         <td > {new Date(promotion[name.nameField]).toLocaleDateString() } </td>     
                  
          )
          else{
            return ( 
                <td > {promotion[name.nameField]} </td>     
         
 )
          }
         }  else{
            return       ( 
                <td > { promotion[name.nameField] } </td>     
         
 )
          }
                   
                }))}
             <td > 

                <ButtonGroup >
                
               < Button size = "sm"
            color = "primary"
            tag = { Link }
            to = { "/promotions/" + promotion._id } > Edit </Button>   <
            Button size = "sm"
            color = "danger"
            onClick = {
                    () => this.remove(promotions._id)
                } > Delete </Button>   
                </ButtonGroup > 
                </td>   
               </tr >
        });

        return ( 
            <div  onScroll={firstEvent} >
            < AppNavbar />
            <Container fluid > 
            <div className = "float-right" >
                        <Button color = "success"
            tag = { Link }
            to = "/promotions/new" > Add Promotion </Button>   
           </ div > 
           
           < h3 > Promotion List </h3>  
            < Table className = "mt-4" >
           
             <thead >
             <tr >
                 {fieldsList}
           </ tr > 
            </thead>  
             <tbody > { promotionList }
             </tbody>  
            </Table > 
            </Container>   
           </ div >
        );
    }
}

export default PromotionList;