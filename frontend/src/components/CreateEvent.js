import './CreateEvent.module.css';
export default function CreateEvent(props){
    return(
        <div className='popup'>
            <p>Challenge description blah blah blahs</p>
            <button className='button btn--alt' onClick={props.close}>Close</button>
            <button className='button' onClick={props.submit}>Submit</button>
        </div>
    );
}