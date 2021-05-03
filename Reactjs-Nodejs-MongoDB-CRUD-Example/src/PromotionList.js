import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import './PromotionList.css'
  
class PromotionList extends Component {
    
    constructor(props) {
        super(props);
        this.state = { fields: [], promotions: [], isLoading: true ,lastScrollTop:0, pageNo:1};
        this.remove = this.remove.bind(this);
        
    }
    
    componentDidMount() {

        this.setState({ isLoading: true });

       fetch(`api/promotions/${0}`).then(response => {
                    response.json()
                    .then(data => this.setState({ promotions: data,isLoading: false }));       
			})
			.catch(error => {
				alert('Axios GET request failed');
			})

            fetch('api/fields')
            .then(response => response.json())
            .then(data => {this.setState({ fields: data, isLoading: false ,pageNo:1})});      
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
     const pageNoumber=this.state.pageNo;
       console.log(`getdata()api/promotions/${this.state.pageNo}`);
       fetch(`api/promotions/${this.state.pageNo}`).then(response => {
        response.json()
        .then(data => { 
            
            console.log(" if(this.state.pageNo",this.state.pageNo);
           console.log("pageNoumber",pageNoumber);
            // debugger
            // if(this.state.pageNo<2)//if not 
            if(pageNoumber<2)//if not 
            {
                this.setState({ promotions: this.state.promotions.concat(data), isLoading: false})
               
            }
            else{
   
   
                this.setState({ promotions: this.state.promotions.concat(data), isLoading: false})
              
                // if()//if up
               console.log("this.state.promotions.splice(0,20)",this.state.promotions.splice(0,20));
               console.log("this.state.promotions",this.state.promotions);
                // else{
                
                // }
            //     const PrevData=this.state.promotions.splice(0,20,data)  
            //     this.setState({ promotions: this.state.promotions.splice(0,20,PrevData), isLoading: false})
            // this.setState({ promotions: this.state.promotions.splice(this.state.pageNo-2,20), isLoading: false})
                // this.setState({ promotions: this.state.promotions.concat(data), isLoading: false})
                // this.setState({ promotions: this.state.promotions.concat(data), isLoading: false})
              
            }
        
        });

       })
   
	}

	firstEvent = (e) => {
    
		console.log("first",e.target.scrollHeight,e.target.scrollTop);
		let bottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 50;
		if(bottom){
			let pg = this.state.pageNo + 1;
            this.setState({pageNo:pg})
            console.log("this.state.pageNo",this.state.pageNo);

			this.getData();
		}
	}

    render() {
        const { fields, promotions, isLoading } = this.state;
      
 

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
            <div  className="div" 
            onScroll={this.firstEvent}>
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