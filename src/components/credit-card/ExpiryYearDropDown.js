const ExpiryYearDropDown = ({ id, name, value, setExpYear }) => {
    const year = (new Date()).getFullYear();
    const years = Array.from(new Array(20),( val, index) => index + year);

    return(
        <select 
            name={name} 
            id={id}
            value={value}
            onChange={(e) => setExpYear(e.target.value)}
        >
            <option value="YYYY">YYYY</option>
            {
                years.map((year) => (
                    <option 
                        key={`year-${year}`} 
                        value={year}
                    >{year}
                    </option>
                ))
            }			
        </select>
    )
}
export default ExpiryYearDropDown;
