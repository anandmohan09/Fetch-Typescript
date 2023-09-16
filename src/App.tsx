import React from 'react';
import { useEffect,useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
export type JsonData={
  id:number;
  title:string;
  body:string;
}

interface ILogin{
  title:string;
  body:string;
}





function App() {
const [post,setPost]=useState<JsonData[]>([]);
const[inputData,setInputData]=useState<ILogin>({
  title:'',
  body:''
});
const[editing,setEditing]=useState<JsonData | null>(null);

  const url = "https://jsonplaceholder.typicode.com/posts";

  useEffect(()=>{
    fetch(url).then((response)=>response.json())
    .then((res)=>setPost(res))

  },[])
  console.log(post,'--post--');
  const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target;
    setInputData({...inputData,[name]:value});

  }
  console.log(inputData,'--inputData--')
const handleSubmit=(e: React.FormEvent<HTMLFormElement>)=>{
  console.log('--Ejkjkjkj--');
  e.preventDefault();
  fetch(url,{
    method: 'POST',
    body: JSON.stringify(inputData),
    // title:inputData.title,
    // body:inputData.body,
    headers:{
      'Content-Type':'application/json; charset=UTF-8',
    }})
    .then((response)=>response.json())
    .then((newPost)=>{setPost([...post,newPost]);
      setInputData({ title: '', body: '' });

    })
    .catch((error)=>console.log(error))

}

const deletePost=(id:number)=>{
  console.log(id);
  fetch(`${url}/${id}`,{
    method: 'DELETE',
})
.then((response)=>response.json())
.then((res)=>{
  console.log(res,'---deletepost---');
  const updatedPosts = post.filter((item) => item.id !== id);
        setPost(updatedPosts);
})

}
const handleUpdate=(e: React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  if(editing){
    fetch(`${url}/${editing.id}`,{
      method:'PUT',
      body: JSON.stringify({title:inputData.title,body:inputData.body}),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      }

    })
    .then((response)=>response.json())
    .then((updatePost)=>{
      console.log(updatePost,'--updatePost--')
      const updatedPosts=post.map((ele:any)=>ele.id === updatePost.id ? updatePost : ele);
      setPost(updatedPosts);
      setInputData({
      title:'',
      body:''
      });
      setEditing(null);
        })
  }

}

const editPost=(editing:JsonData)=>{
  console.log(editing,'--editing--')
  setEditing(editing);
  setInputData({
    title:editing.title,
    body:editing.body
  })

}

  return (
    <div>

    <Form onSubmit={editing ? handleUpdate:handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="name@example.com" onChange={handleChange} name='title' value={inputData.title}   />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Body</Form.Label>
        <Form.Control type='text' as="textarea" rows={3}  onChange={handleChange}  name='body' value={inputData.body} />
      </Form.Group>
      <Button type='submit' variant="success">{editing ? 'Update':'Create'}</Button>
    </Form>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Body</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          post && post.map((ele:any)=>{
            return (
              <>
              <tr key={ele.id}>
                <td>{ele.id}</td>
                <td>{ele.title}</td>
                <td>{ele.body}</td>
                <td>
                  <div style={{display:'flex'}}>                
                    <Button onClick={()=>editPost(ele)} variant="primary">Edit</Button>
                <Button style={{marginLeft:'10px'}} variant="danger" onClick={()=>deletePost(ele.id)}>Delete</Button>
                </div>

                  
                </td>
              </tr>
              </>
            )
          })
        }
     
      </tbody>
    </Table>
    
    </div>
    
//dffkjfkgrgregrg
    
    
  );
}

export default App;
