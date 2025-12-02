
import './App.css';
//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { useNavigate } from 'react-router-dom';
//nimport './App.css'
//import Sun from './assets/Page1/sun.png';
//import DPBG from './assets/Page1/DPBG.png';

function SecurityPage() {
    const navigate = useNavigate();


  const securityitems = [

    'Change Password',
    'Turn on Security Alerts' ,
    'Account Recovery',
    'Delete Account',
  ];

  return(
    //<div>
        <div className="app-background">
      {/* Example content */}
      <h1 
        style={{ 
          position: 'absolute', 
          top: '10%', 
          left: '50%', 
          transform: 'translateX(-50%)',
          fontFamily: "'Burbank Big Condensed', sans-serif",
          fontSize: '3rem',
          color: 'black'
        }}
      >  Privacy Statement

      </h1>
      
        <div 
        className="scroll-box"
        style={{
          position: "absolute",
          top: "22%",        // move it under the title
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          height: "500px",   // size of the scroll area
          padding: "10px",
          overflowY: "auto",
          backgroundColor: "rgba(255,255,255,0.7)",
          borderRadius: "10px",
          border: "1px solid #aaa",
          fontFamily: "'Burbank Big Condensed', sans-serif",
          fontSize: "1.2rem"
        }}
      >

        <p> This Notice establishes Kennesaw State University’s (“KSU”) privacy notices for both its website located at kennesaw.edu (“Site”) and in compliance with any applicable data privacy standards and legal requirements regarding the data collected, including compliance with the European Union General Data Protection Regulation (“EU GDPR”).  This Notice describes the type of information KSU collects from visitors to this Site, what we do with that information, and how visitors can update and control the use of information collected by this Site. 

Type of Information Collected and Why:
Kennesaw State University (KSU) is committed to ensuring the privacy of your information. KSU collects two kinds of information on this site:  1) Information that is voluntarily supplied by visiting the site and enrolling in programs and 2) Information that is automatically collected as you navigate the site. 

Information voluntarily supplied by visitors seeking to access various features and information includes, among other things, name, address, and phone number. Any personal information that you choose to provide through the Site will be protected in accordance with the provisions of this Notice. If you refuse to provide personal data that is required by KSU in connection with one of KSU’s lawful bases to collect such personal data, such refusal may make it impossible for KSU to provide education, employment, or other requested services.

Information automatically collected includes the user’s IP address, date and time of the website access along with the web pages(s) visited. In addition, KSU may also collect any information that it receives from your web browser, including browser type and version, and operating system.  This information helps us understand aggregate uses of our site, track usage trends and improve our services. Additionally, university web sites use cookies to collect certain information. Cookies are small pieces of data that are sent by our Website to your Web browser. They are stored on your computer and are used to improve your web experience and improve the availability of web content. We may also use cookies to pre-fill forms so that you do not need to re-enter data. Accepting a cookie does not give us access to your computer or any personal information about you.

Links to Other Websites:
Links within the university website may direct you to other websites not affiliated with KSU.  KSU is not responsible for the privacy practices, policies, actions, web content, services, or products of non-KSU sites to which we link. These links are not intended to, nor do they constitute, an endorsement by KSU of the linked materials.  We encourage you to read the privacy statements of other sites for assurance that their practices safeguard your privacy.

Security and Accuracy of Confidential Information:
KSU does its best to reasonably ensure that the personal information obtained from you is accurate. Visitors may review the information saved or submitted via the Site at any time up to the point when it is purged. If there is an error in your personal information, we will correct the information upon your request, which may be submitted to dataprivacy@usg.edu. 

We have put in place reasonable physical, technical, and administrative safeguards designed to prevent unauthorized access to the online information we collect and use. While we strive to protect visitor’s personal information by encryption and other means, we cannot guarantee or warrant the security of the information you transmit to us, and if you choose to use the Site, you do so at your own risk. 

If you post any data within a public forum on any KSU website, that data is now public. 

Sharing of Information:
KSU is committed to maintaining the privacy of your personal information. Any information submitted via the website will only be used for the purposes stated on the submission page.  KSU does not actively share personal information gathered from the Site, except:

as required by law (including but not limited to the Georgia Open Records Act);
as necessary to protect KSU interests;
as necessary to further research efforts pursuant to approvals from the appropriate data stewards and the Institutional Review Board;
and/or with contracted service providers acting on behalf of the university who have agreed to protect the confidentiality of the data.  
KSU also complies with the Family Educational Rights and Privacy Act (“FERPA”), which generally prohibits (with some exceptions) the release of education records without student permission. Please visit KSU’s FERPA website for more information.

European Union General Data Protection Regulation (EU GDPR) Privacy Notice |
Lawful Basis for Collecting and Processing of Personal Data:
Kennesaw State University is an institution of higher education involved in education, research, and community engagement. For KSU to educate its students both in class and on-line, engage in world-class research, and provide community services, it is essential, necessary, and KSU has lawful bases to collect, process, use, and maintain data of its students, employees, applicants, research subjects, and others involved in its educational, research, and community programs. The lawful bases include, without limitation, admission, registration, delivery of classroom, on-line, and study abroad education, grades, communications, employment, applied research, development, program analysis for improvements, and records retention. Examples of data that KSU may need to collect in connection with the lawful bases are: name, email address, IP address, physical address or other location identifier, photos, as well as some sensitive personal data obtained with prior consent.

For more information regarding the EU GDPR, please review Kennesaw State’s EU General Data Protection Regulation Compliance Policy.  All personal data and sensitive personal data collected or processed by KSU under the scope of the KSU EU General Data Protection Regulation Compliance Policy must comply with the security controls and systems and process requirements and standards of KSU policies.

The majority of KSU’s collection and processing of personal data will fall under the following categories:

Processing is necessary for the purposes of the legitimate interests pursued by KSU or third parties in providing education, employment, research and development, and community programs.
Processing is necessary for the performance of a contract to which the data subject is party or in order to take steps at the request of the data subject prior to entering into a contract. This lawful basis pertains primarily but not exclusively to research contracts.
Processing is necessary for compliance with a legal obligation to which KSU is subject.
The data subject has given consent to the processing of his or her personal data for one or more specific purposes.  This lawful basis pertains primarily, but not exclusively, to the protection of research subjects.
There will be some instances where the collection and processing of personal data will be pursuant to other lawful bases.

Where KSU Obtains Personal Data and Special Categories of Sensitive Personal Data:
KSU receives personal data and special categories of sensitive personal data from multiple sources. Most often, this data comes directly from the data subject or under the direction of the data subject who has provided it to a third party (for example, application for admission to KSU through use of the Common App). 

Individual Rights of the Data Subject under the EU GDPR:
Individual data subjects covered by KSU’s EU General Data Protection Regulation Compliance Policy will be afforded the following rights:

information about the controller collecting the data
the data protection officer contact information
the purposes and legal basis/legitimate interests of the data collection/processing
recipients of the personal data
if KSU intends to transfer personal data to another country or international organization
the period the personal data will be stored
the existence of the right to access, rectify incorrect data or erase personal data, restrict or object to processing, and the right to data portability
the existence of the right to withdraw consent at any time
the right to lodge a complaint with a supervisory authority (established in the EU)
why the personal data are required, and possible consequences of the failure to provide the data
the existence of automated decision-making, including profiling
if the collected data are going to be further processed for a purpose other than that for which it was collected

Note: Exercising of these rights is a guarantee to be afforded a process and not the guarantee of an outcome.
Any data subject who wishes to exercise any of the above-mentioned rights under the EU GDPR may do so by submitting a Service Request with the Office of Cybersecurity at dataprivacy@kennesaw.edu.   

Website Data Collected and Why; Cookies:
Please see the “Type of Information Collected and Why” section above for details regarding information collected from KSU websites and cookies.

Security of Personal Data subject to the EU GDPR:
All personal data collected or processed by KSU under the scope of the KSU EU General Data Protection Regulation Compliance Policy must comply with organizational security controls, standards, processes and policies.  If you have questions about this Notice or believe that your personal information has been released without your consent or if you wish to correct information held by KSU, please contact us at dataprivacy@usg.edu.

KSU will not share your information with third parties except as necessary to meet one of KSU’s lawful purposes. 

Georgia Open Records Act:
As an entity of the government of the State of Georgia, KSU is subject to the provisions of the Georgia Open Records Act (ORA). Except for those records that are exempt from disclosure under the ORA, the ORA provides that all citizens are entitled to view the records of state agencies on request and to make copies for a fee.  For more information on KSU’s ORA compliance, please visit the Open Records Requests page on the Division of Legal Affairs website. 

Data Retention:
KSU keeps the data it collects for the time periods specified in the University System of Georgia Records Retention Schedules. 

For examples of Student Records Retention Schedules, see: https://www.usg.edu/records_management/schedules/934

For examples of Human Resources (Employment) Records Retention Schedules, see: https://www.usg.edu/records_management/schedules/930


        </p>

        

      
      
</div>

<button 
        onClick={() => navigate('/third')}  
        style={{ 
          position: 'absolute', 
          bottom: '10%', 
          left: '50%', 
          transform: 'translateX(-50%)',
          padding: '10px 20px',
          fontFamily: "'Burbank Big Condensed', sans-serif",
          fontSize: '1.5rem',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        BACK
      </button>
</div>
    
      
  )
}

export default SecurityPage
