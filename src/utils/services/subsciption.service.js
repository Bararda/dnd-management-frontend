import Api from './api';

export default class SubscriptionService {

    static post() {
		const evtSource = new EventSource(Api.endPointURL + '/subscribe', {withCredentials: true});
		return evtSource;
    }
    
}
SubscriptionService.route = '/subscribe';