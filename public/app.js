//import { response } from "express"

new Vue({
    el: '#app',
    data() {
      return {
        isDark: true,
        show: true,
        todoTitle: '',
        todos: []
      }
    },
    created(){
     const query = `
     query {
      getTodos{
        title createdAt updatedAt done id
      }
     }
     `

     fetch('/graphql',{
       method:'post',
       headers:{
         'Content-type':'application/json',
         'Accept':'application/json'
       },
       body: JSON.stringify({query})
     }).then(res => res.json())
     .then(response =>{
       this.todos = response.data.getTodos
     })
    },
    methods: {
      addTodo() {
        const title = this.todoTitle.trim()
        if (!title) {
          return
        }
        const query = `
            mutation {
              createTodo(todo: {title: "${title}"}) {
                title
                id
                done 
                createdAt
                updatedAt
              }
            }
            `
        fetch('/graphql',{
          method:'post',
          headers:{
            'Content-type':'application/json',
            'Accept':'application/json'
          },
          body: JSON.stringify({query})
        }).then(res =>res.json())
        .then(response =>{
          const todo = response.data.createTodo
          this.todos.push(todo)
          this.todoTitle = ''
        }).catch(err =>{
          console.error(err)
        })
        
      },
      removeTodo(id) {
        const query = `
        mutation {
          deleteTodo(id:"${id}")
        }
        `
        fetch('/graphql',{
          method:'post',
          headers:{
            'Content-type':'application/json',
            'Accept':'application/json'
          },
          body:JSON.stringify({query})
        }).then(()=>{
          this.todos = this.todos.filter(t => t.id !== id)
        }).catch(err =>{
          console.error(err)
        })
        
      },
      complitetodo(id){

        const query = `
        mutation {
          completeTodo(id:"${id}"){
            updatedAt
          }
        }
        `
        fetch('graphql',{
          method:'post',
          headers:{
            'Content-type':'application/json',
            'Accept':'application/json'},
          body: JSON.stringify({query})
        }).then(res =>res.json())
        .then(response=>{
          const idx = this.todos.findIndex(t => t.id === id)
          this.todos[idx].updatedAt = response.data.completeTodo.updatedAt
        }).catch(err =>{
          console.error(err)
        })
        
      }
    },
    filters: {
      capitalize(value) {
        return value.toString().charAt(0).toUpperCase() + value.slice(1)
      },
      date(value,withTime) {
        const options = {
          year: 'numeric',
          month: 'long',
          day: '2-digit'
        }

        if(withTime){
          options.hour = '2-digit'
          options.minute = '2-digit'
          options.second = '2-digit'
        }
        return new Intl.DateTimeFormat('ru-RU', options).format(new Date(+value))
      }
    }
  })