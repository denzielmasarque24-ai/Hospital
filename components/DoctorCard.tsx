import Link from "next/link";

type DoctorCardProps = {
  name: string;
  specialty: string;
  experience: string;
  availability: string;
  image: string;
  href?: string;
};

export function DoctorCard({
  name,
  specialty,
  experience,
  availability,
  image,
  href = "/appointment",
}: DoctorCardProps) {
  return (
    <article className="doctor-card">
      <div className="doctor-image-wrap">
        <img src={image} alt={name} className="doctor-image" />
      </div>
      <div className="doctor-content">
        <div>
          <h3>{name}</h3>
          <span className="doctor-specialty">{specialty}</span>
        </div>
        <ul className="doctor-list">
          <li>{experience}</li>
          <li>{availability}</li>
        </ul>
        <div className="doctor-actions">
          <Link href="/doctors" className="text-link">
            View Profile
          </Link>
          <Link href={href} className="btn-primary compact">
            Book Appointment
          </Link>
        </div>
      </div>
    </article>
  );
}
