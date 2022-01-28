import LandingHeading from '../components/LandingHeading'
import StocksTable from '../components/StocksTable'

const Landing = () => {
    return (
        <>
            <LandingHeading />
            <div class="container mx-auto flex items-center">
                <StocksTable />
            </div>
        </>
    )
}


export default Landing;
