const PrincipalTitle = (props) => <h1>{props.title}</h1>

const SecondaryTitle = (props) => {
    if (props.city) {
        return <h2>{props.title} {props.city}</h2>
    }
    return <h2>{props.title}</h2>
} 

export {PrincipalTitle, SecondaryTitle}