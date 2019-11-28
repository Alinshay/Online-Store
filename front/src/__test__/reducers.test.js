import rootReducer from '../components/reducers/cartReducer';
describe('>>> REDUCER >>>',()=>{

  it('+++ reducer for ITEMS_HAS_ERRORED', () => {
    let state = {hasErrored:false}
    state = rootReducer(state.logic,{type:"ITEMS_HAS_ERRORED",hasErrored:true});
    expect(state.logic.hasErrored).toEqual(true);
  });

    it('+++ reducer for SEND_SUBSCRIPTION', () => {
        let state = {isPost:false}
        state = rootReducer(state.logic,{type:"SEND_SUBSCRIPTION",isPost:true});
        expect(state.logic.isPost).toEqual(true);
    });


    it('+++ reducer for SUBMIT', () => {
        let state = {isSubmitted:false}
        state = rootReducer(state.logic,{type:"SUBMIT", isSubmitted:true});
        expect(state.logic.isSubmitted).toEqual(true);
    });



});