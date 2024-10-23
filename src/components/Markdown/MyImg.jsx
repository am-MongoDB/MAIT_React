export default function MyImg({ props }) {
  return (
    <img className="my-img" alt={props.alt} title={props.title} src={props.src}/>
  );
}