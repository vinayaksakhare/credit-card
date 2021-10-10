import { ReactComponent as CardExample } from './../../assets/card_example.svg';
import { ReactComponent as AmericanExpress } from './../../assets/american_express.svg';
import { ReactComponent as Discover } from './../../assets/discover.svg';
import { ReactComponent as Mastercard } from './../../assets/mastercard.svg';
import { ReactComponent as Visa } from './../../assets/visa.svg';

const CreditCardLogo = ({ cardType }) => {
    const renderLogo = () =>{
        switch(cardType){
            case 'A': return <AmericanExpress alt='american express'/>
            case 'D': return <Discover alt='discover'/>
            case 'M': return <Mastercard alt='mastercard'/>
            case 'V': return <Visa alt='visa'/>
            default : return <CardExample alt='example card'/>
        }
    }

    return (
        <div className="card-logo">
            {renderLogo()}
        </div>     
    )

}

export default CreditCardLogo;
