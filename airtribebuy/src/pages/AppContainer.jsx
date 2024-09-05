import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';
import { HeaderMenu } from '../components/HeaderMenu';

function AppContainer(props) {
    const user = useSelector(state => state.user);
    return (
        <>
            <HeaderMenu user={user} />
            {props.children}
        </>
    )
}

AppContainer.propTypes = {
    children: PropTypes.node.isRequired,
}
export default AppContainer;