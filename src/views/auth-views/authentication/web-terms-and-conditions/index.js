import React, { useState, useEffect } from "react";
import { Button, Card, Input } from "antd";
import { useHistory } from "react-router-dom";
import axios from "axios";

const AppTermsAndConditions = () => {
  const [valueTermsAndConditions, setValueTermsAndConditions] = useState('');
  const tok = localStorage.getItem('token');
  const history = useHistory();

  useEffect(() => {
    axios
      .get(
        `/api/tc/terms_and_conditions`,
        {},
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${tok}`
          },
        }
      )
      .then((response) => {
        let res = response.data.data;
        // console.log(res)
        setValueTermsAndConditions(res)
        let doc = document.getElementById('tc-text');
        doc.innerHTML = res
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);

  return (
    <div>
      <div className="m-3 d-flex justify-content-end align-items-center">
        <Button type="default" onClick={() => history.goBack()}>
            Back
        </Button>
      </div>
      <Card className="m-3">
        {/* <div id="tc-text"></div> */}
        <div class="container">
            <h1>Terms and conditions</h1>
            <p>These terms and conditions (“Agreement”) set forth the general terms and conditions of your use of the <a href="https://www.grand-energy-technologies.com.sg">grand-energy-technologies.com.sg</a> website
                (“Website” or “Service”) and any of its related products and services (collectively, “Services”). This
                Agreement is legally binding between you (“User”, “you” or “your”) and Grand Energy Technologies Pte Ltd
                (“Grand Energy Technologies Pte Ltd”, “we”, “us” or “our”). If you are entering into this Agreement on
                behalf of a business or other legal entity, you represent that you have the authority to bind such
                entity to this Agreement, in which case the terms “User”, “you” or “your” shall refer to such entity. If
                you do not have such authority, or if you do not agree with the terms of this Agreement, you must not
                accept this Agreement and may not access and use the Website and Services. By accessing and using the
                Website and Services, you acknowledge that you have read, understood, and agree to be bound by the terms
                of this Agreement. You acknowledge that this Agreement is a contract between you and Grand Energy
                Technologies Pte Ltd, even though it is electronic and is not physically signed by you, and it governs
                your use of the Website and Services.</p>
            <div class="toc">
                <h3>Table of contents</h3>
                <ol class="toc">
                    <li><a href="#accounts-and-membership">Accounts and membership</a></li>
                    <li><a href="#links-to-other-resources">Links to other resources</a></li>
                    <li><a href="#intellectual-property-rights">Intellectual property rights</a></li>
                    <li><a href="#indemnification">Indemnification</a></li>
                    <li><a href="#dispute-resolution">Dispute resolution</a></li>
                    <li><a href="#changes-and-amendments">Changes and amendments</a></li>
                    <li><a href="#acceptance-of-these-terms">Acceptance of these terms</a></li>
                    <li><a href="#contacting-us">Contacting us</a></li>
                </ol>
            </div>
            <h2 id="accounts-and-membership">Accounts and membership</h2>
            <p>If you create an account on the Website, you are responsible for maintaining the security of your account
                and you are fully responsible for all activities that occur under the account and any other actions
                taken in connection with it. We may monitor and review new accounts before you may sign in and start
                using the Services. Providing false contact information of any kind may result in the termination of
                your account. You must immediately notify us of any unauthorized uses of your account or any other
                breaches of security. We will not be liable for any acts or omissions by you, including any damages of
                any kind incurred as a result of such acts or omissions. We may suspend, disable, or delete your account
                (or any part thereof) if we determine that you have violated any provision of this Agreement or that
                your conduct or content would tend to damage our reputation and goodwill. If we delete your account for
                the foregoing reasons, you may not re-register for our Services. We may block your email address and
                Internet protocol address to prevent further registration.</p>
            <h2 id="links-to-other-resources">Links to other resources</h2>
            <p>Although the Website and Services may link to other resources (such as websites, mobile applications,
                etc.), we are not, directly or indirectly, implying any approval, association, sponsorship, endorsement,
                or affiliation with any linked resource, unless specifically stated herein. We are not responsible for
                examining or evaluating, and we do not warrant the offerings of, any businesses or individuals or the
                content of their resources. We do not assume any responsibility or liability for the actions, products,
                services, and content of any other third parties. You should carefully review the legal statements and
                other conditions of use of any resource which you access through a link on the Website. Your linking to
                any other off-site resources is at your own risk.</p>
            <h2 id="intellectual-property-rights">Intellectual property rights</h2>
            <p>“Intellectual Property Rights” means all present and future rights conferred by statute, common law or
                equity in or in relation to any copyright and related rights, trademarks, designs, patents, inventions,
                goodwill and the right to sue for passing off, rights to inventions, rights to use, and all other
                intellectual property rights, in each case whether registered or unregistered and including all
                applications and rights to apply for and be granted, rights to claim priority from, such rights and all
                similar or equivalent rights or forms of protection and any other results of intellectual activity which
                subsist or will subsist now or in the future in any part of the world. This Agreement does not transfer
                to you any intellectual property owned by Grand Energy Technologies Pte Ltd or third parties, and all
                rights, titles, and interests in and to such property will remain (as between the parties) solely with
                Grand Energy Technologies Pte Ltd. All trademarks, service marks, graphics and logos used in connection
                with the Website and Services, are trademarks or registered trademarks of Grand Energy Technologies Pte
                Ltd or its licensors. Other trademarks, service marks, graphics and logos used in connection with the
                Website and Services may be the trademarks of other third parties. Your use of the Website and Services
                grants you no right or license to reproduce or otherwise use any of Grand Energy Technologies Pte Ltd or
                third party trademarks.</p>
            <h2 id="indemnification">Indemnification</h2>
            <p>You agree to indemnify and hold Grand Energy Technologies Pte Ltd and its affiliates, directors,
                officers, employees, agents, suppliers and licensors harmless from and against any liabilities, losses,
                damages or costs, including reasonable attorneys’ fees, incurred in connection with or arising from any
                third party allegations, claims, actions, disputes, or demands asserted against any of them as a result
                of or relating to your Content, your use of the Website and Services or any willful misconduct on your
                part.</p>
            <h2 id="dispute-resolution">Dispute resolution</h2>
            <p>The formation, interpretation, and performance of this Agreement and any disputes arising out of it shall
                be governed by the substantive and procedural laws of Singapore without regard to its rules on conflicts
                or choice of law and, to the extent applicable, the laws of Singapore. The exclusive jurisdiction and
                venue for actions related to the subject matter hereof shall be the courts located in Singapore, and you
                hereby submit to the personal jurisdiction of such courts. You hereby waive any right to a jury trial in
                any proceeding arising out of or related to this Agreement. The United Nations Convention on Contracts
                for the International Sale of Goods does not apply to this Agreement.</p>
            <h2 id="changes-and-amendments">Changes and amendments</h2>
            <p>We reserve the right to modify this Agreement or its terms related to the Website and Services at any
                time at our discretion. When we do, we will post a notification on the main page of the Website. We may
                also provide notice to you in other ways at our discretion, such as through the contact information you
                have provided.</p>
            <p>An updated version of this Agreement will be effective immediately upon the posting of the revised
                Agreement unless otherwise specified. Your continued use of the Website and Services after the effective
                date of the revised Agreement (or such other act specified at that time) will constitute your consent to
                those changes.</p>
            <h2 id="acceptance-of-these-terms">Acceptance of these terms</h2>
            <p>You acknowledge that you have read this Agreement and agree to all its terms and conditions. By accessing
                and using the Website and Services you agree to be bound by this Agreement. If you do not agree to abide
                by the terms of this Agreement, you are not authorized to access or use the Website and Services. 
            </p><h2 id="contacting-us">Contacting us</h2>
            <p>If you have any questions, concerns, or complaints regarding this Agreement, we encourage you to contact
                us using the details below:</p>
            <p><a href="mailto:info@getpl.com.sg">info@getpl.com.sg</a>
            </p>
            <p>This document was last updated on June 20, 2024</p>
        </div>
      </Card>
    </div>
  )
}

export default AppTermsAndConditions