import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { JsxElement } from 'typescript';
import { Todo, fetchTodos, deleteTodo } from '../actions';
import { StoreState } from '../reducers';

interface AppProps {
  todos: Todo[];
  fetchTodos: Function;
  deleteTodo: typeof deleteTodo;
}

interface AppState {
  fetching: boolean;
}

const _App1: React.FC<AppProps> = (props: AppProps) => {
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    setLoading(false)
    setCount(props.todos.length)
  },[props.todos.length]);

  const onButtonClick = (): void => {
    props.fetchTodos();
    setLoading(true)
    
  };

  const onTodoClick = (id: number): void => {
    props.deleteTodo(id);
  };

  const renderList = (): JSX.Element[] => {
    return props.todos.map((todo: Todo) => {
      return (
        <div  key={todo.id}>
          <span >{todo.title} </span>
          <span onClick={() => onTodoClick(todo.id)}> <button>delele</button></span>
        </div>
      );
    });
  }
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={onButtonClick}>Fetch</button>
      {loading ? 'LOADING' : null}
      {renderList()}
    </div>
  );
}

// class _App extends React.Component<AppProps, AppState> {
//   constructor(props: AppProps) {
//     super(props);

//     this.state = { fetching: false };
//   }

//   componentDidUpdate(prevProps: AppProps): void {
//     if (!prevProps.todos.length && this.props.todos.length) {
//       this.setState({ fetching: false });
//     }
//   }

//   onButtonClick = (): void => {
//     this.props.fetchTodos();
//     this.setState({ fetching: true });
//   };

//   onTodoClick = (id: number): void => {
//     this.props.deleteTodo(id);
//   };

//   renderList(): JSX.Element[] {
//     return this.props.todos.map((todo: Todo) => {
//       return (
//         <div onClick={() => this.onTodoClick(todo.id)} key={todo.id}>
//           {todo.title}
//         </div>
//       );
//     });
//   }

//   render() {
//     return (
//       <div>
//         <button onClick={this.onButtonClick}>Fetch</button>
//         {this.state.fetching ? 'LOADING' : null}
//         {this.renderList()}
//       </div>
//     );
//   }
// }

const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => {
  return { todos };
};

export const App = connect(
  mapStateToProps,
  { fetchTodos, deleteTodo }
)(_App1);
