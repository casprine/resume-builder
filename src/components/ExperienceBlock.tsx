import { format } from 'date-fns';

interface Highlight {
  index: string | number;
  highlight: string;
}

export interface ExperienceBlockType {
  id: string;
  companyName: string;
  jobTitle: string;
  startDate: string;
  endDate?: null;
  highlights: Highlight[];
  location: string;
}

export const ExperienceBlock = ({ experience }: { experience: ExperienceBlockType }) => {
  return (
    <section className="experience-block">
      <div className="experience-header">
        <div className="left">
          <h2>{experience.companyName}</h2>
          <p>{experience.jobTitle}</p>
        </div>
        <div className="right">
          <p className="date">
            {formatDate(experience?.startDate)} - {experience?.endDate ? formatDate(experience.endDate) : 'Now'}
          </p>
          <p className="location">{experience.location}</p>
        </div>
      </div>

      <ul className="highlights">
        {experience.highlights.map(({ highlight }, index) => {
          return <li key={index}>{highlight}</li>;
        })}
      </ul>
    </section>
  );
};

function formatDate(dateString: string) {
  return format(new Date(dateString), 'LLL y');
}
