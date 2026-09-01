import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../assets/styles/Timeline.scss'

function Timeline() {
  return (
    <div id="history">
      <div className="items-container">
        <h1>Career History</h1>
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid  white' }}
            date="Mar 2026 - present"
            iconStyle={{ background: 'var(--cin-accent)', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Generative AI Intern</h3>
            <h4 className="vertical-timeline-element-subtitle">Ve Lyra Labs</h4>
            <p>
              Building an enterprise healthcare AI platform, now scaling into a multi-tenant
              B2B service. Built a FHIR R4 electronic health record, a DICOM diagnostic tool,
              an agentic clinical research assistant, and hospital intelligence dashboards.
              Cut clinician scan-review time by 85%, and deliver citation-backed answers from
              PubMed, FDA, NIH and WHO in around 30 seconds at 90% accuracy.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="May 2025 - Jul 2025"
            iconStyle={{ background: 'var(--cin-accent)', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">System Infrastructure Automation Intern</h3>
            <h4 className="vertical-timeline-element-subtitle">Abhyasana Technologies</h4>
            <p>
              Server-client architecture, web server configuration and load balancing, with
              cloud deployment and scaling strategies for enterprise applications.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Jan 2025 - Jun 2025"
            iconStyle={{ background: 'var(--cin-accent)', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Machine Learning Intern</h3>
            <h4 className="vertical-timeline-element-subtitle">SDK Technologies</h4>
            <p>
              Built a MobileNetV2 and TensorFlow Lite vision system recognising over 40 produce
              classes at 98% accuracy, with OpenCV pipelines handling real-time preprocessing
              and inference on the device itself.
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;
