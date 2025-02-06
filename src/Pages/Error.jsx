import errorImage from '../assets/Imges/404 Error-amico.png'
function Error(){

    return(
        <div className="img-holder flex justify-center">
            <img className='w-200 items-center' src={errorImage}/>
        </div>
    )
}
export default Error;