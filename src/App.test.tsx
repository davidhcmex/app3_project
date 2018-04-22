// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import App from './App';


// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });

// 2
// import * as Adapter from "enzyme-adapter-react-16";
// import * as Enzyme from "enzyme";
// //import { render } from "enzyme"
// import App from './App';
// import * as React from 'react';
// import { Provider } from "react-redux"
// import store from "./index"

// Enzyme.configure({ adapter: new Adapter() });
// it('renders correctly', () => {
//   const wrapper = Enzyme.shallow(
//     <Provider store={store}>
//       <App />
//     </Provider>
//   )
//   expect(wrapper).toMatchSnapshot()
// });



//3
import * as Adapter from "enzyme-adapter-react-16";
import * as Enzyme from "enzyme";
import { shallow } from "enzyme"
import { Header } from './components/Header';
//import { LoginForm } from './components/LoginForm';
import * as React from 'react';
// import * as ReactDOM from 'react-dom';


Enzyme.configure({ adapter: new Adapter() });
describe('Header', () => {
  let wrapper: any;

      beforeEach(() => {
        wrapper = shallow(
          <Header />
        );
      });

      it("has '<a>' element", () => {

        expect(
          wrapper.containsMatchingElement(<a></a>)
        ).toBe(true);
      });

      it("has '<button>' element", () => {
        expect(
          wrapper.containsMatchingElement(<button></button>)
        ).toBe(true);
      });

      it("button has an indented span element", () => {
        const button = wrapper.find("button").first();
        console.log("botton props");
        console.log(button.props().children.type);
        expect(
          button.props().children.type
        ).toBe('span');
      });
      
      it("there are four li elements ", ()=>{
        const li = wrapper.find("li")
        expect (li).toHaveLength(4)
      })

      it("the first li has a Link element ", ()=>{
        const li = wrapper.find("li").first();
        expect (li.containsMatchingElement("Link"))
      })

      // it("Matches snapshot", () => {
      //   expect(
      //     wrapper
      //   ).toMatchSnapshot();
      // });
})

// describe('LoginForm', () => {
//   let wrapper: any;

//       beforeEach(() => {
//         wrapper = shallow(
//           <LoginForm  />
//         );
//       });

//       it("has '<a>' element", () => {

//         expect(
//           wrapper.containsMatchingElement(<a></a>)
//         ).toBe(true);
//       });

//       it("has '<button>' element", () => {
//         expect(
//           wrapper.containsMatchingElement(<button></button>)
//         ).toBe(true);
//       });

//       it("button has an indented span element", () => {
//         const button = wrapper.find("button").first();
//         console.log("botton props");
//         console.log(button.props().children.type);
//         expect(
//           button.props().children.type
//         ).toBe('span');
//       });
      
//       it("there are four li elements ", ()=>{
//         const li = wrapper.find("li")
//         expect (li).toHaveLength(4)
//       })

//       it("the first li has a Link element ", ()=>{
//         const li = wrapper.find("li").first();
//         expect (li.containsMatchingElement("Link"))
//       })

//       // it("Matches snapshot", () => {
//       //   expect(
//       //     wrapper
//       //   ).toMatchSnapshot();
//       // });
// })



