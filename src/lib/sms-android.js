import SmsAndroid from 'react-native-get-sms-android';
export const SMS  = SmsAndroid;

export const filter = {
  box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
  /**
   *  the next 3 filters can work together, they are AND-ed
   *  
   *  minDate, maxDate filters work like this:
   *    - If and only if you set a maxDate, it's like executing this SQL query:
   *    "SELECT * from messages WHERE (other filters) AND date <= maxDate"
   *    - Same for minDate but with "date >= minDate"
   */
  //minDate: 1554636310165, // timestamp (in milliseconds since UNIX epoch)
  //maxDate: 1556277910456, // timestamp (in milliseconds since UNIX epoch)
  //bodyRegex: '(.*)WhatsApp(.*)', // content regex to match
 
  /** the next 5 filters should NOT be used together, they are OR-ed so pick one **/
  //read: 0, // 0 for unread SMS, 1 for SMS already read
  //_id: 1234, // specify the msg id
  //thread_id: 12, // specify the conversation thread_id
  //address: '+541132467705', // sender's phone number
  //body: 'WhatsApp', // content to match
  /** the next 2 filters can be used for pagination **/
  //indexFrom: 0, // start from index 0
  //maxCount: 10, // count of SMS to return each time
};
