import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import './PromotionList.css'
  
class PromotionList extends Component {
    
    constructor(props) {
        super(props);
        this.state = { fields: [], promotions: [], isLoading: true ,lastScrollTop:0, pageNo:1,scroll:"down"};
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
               console.log("getdata data",data,!(JSON.stringify(data)===JSON.stringify([])));
              if(!(JSON.stringify(data)===JSON.stringify([]))){
                    if(this.state.pageNo>pageNoumber){
                this.setState({ promotions: this.state.promotions.concat(data), isLoading: false})
               if(pageNoumber>2)//if not first
               {
                      this.state.promotions.splice(0,20)
               }
              }
              else{ } 
          
              }
              else{
                const pg = this.state.pageNo -1;
                this.setState({pageNo:pg})
              }
             });
          })
       }

       getDataUpScroll(){
        //    debugger
       
        //    let pageNoumber=this.state.pageNo;
        //     pageNoumber=pageNoumber-1;

  console.log("getDataUpScroll this.state.pageNo",this.state.pageNo);
            //    console.log("getDataUpScroll pageNoumber",pageNoumber);
                // console.log("this.state.pageNo>pageNoumber",this.state.pageNo>pageNoumber);
                if(this.state.pageNo>=0){
//    the pageNo need to be smaller---
console.log(`getdata()api/promotions/${this.state.pageNo}`);
fetch(`api/promotions/${this.state.pageNo}`).then(response => {
 response.json()
 .then(data => { 
   
 

    // if(this.state.pageNo>pageNoumber){

// contac data to front
console.log("up promotion 111" ,this.state.promotions,"data",data);
     this.setState({ promotions: data.concat(this.state.promotions), isLoading: false})

     console.log("up promotion 222" ,this.state.promotions,"data",data);

     // if(pageNoumber<1112)//if not last???change the number to?
     // {
this.state.promotions.splice(40,0)//? check if(20,0)

     // }
    // } else{ 
      
    //        this.setState({pageNo:0})
    //  }
    
 });
})


//     pg = this.state.pageNo + 2;
//    this.setState({pageNo:pg})

                }else{
                    this.setState({pageNo:0})
                }

       }
    

   firstEvent = (e) => {

    const st = e.target.scrollTop; 
    if (st > this.state.lastScrollTop){
       // downscroll code
    const bottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 50;
           if(bottom){
               const pg = this.state.pageNo + 1;
               this.setState({pageNo:pg})
               this.getData();
           }

       console.log("downscroll code");
    } else {
        // upscroll code
const scrollBottom=e.target.scrollHeight-(e.target.scrollHeight-e.target.scrollTop)<50;
    console.log("scrollBottom",scrollBottom);
    if(scrollBottom){
        // const pg = this.state.pageNo - 2;
        // this.setState({pageNo:pg})
        let pg = this.state.pageNo - 1;
        this.setState({pageNo:pg})
        this.getDataUpScroll();
    }
        console.log("upscroll code");
    }
    this.setState({lastScrollTop: st <= 0 ? 0 : st })
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