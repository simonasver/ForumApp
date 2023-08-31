interface TopicBarProps {
  id: string;
  title: string;
}

const TopicBar = (props: TopicBarProps) => {
  const { id, title } = props;
  return <>{title}</>;
};

export default TopicBar;
