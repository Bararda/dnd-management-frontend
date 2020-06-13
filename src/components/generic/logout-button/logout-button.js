import React from 'react';
import { AuthService } from '../../../utils/services';
export default function LogoutButton(props) {
    const logout = () => {
        AuthService.logout();
    };

	return (
		<div className="logout-button-container">
			<span onClick={logout} className='logout-button'>Logout</span>
		</div>
	);
}
