import Filter from "./Filter";
const Science = ({ setOpenIndividualStoryModal, openIndividualStoryModal }) => {
  return (
    <Filter
      category={"Science"}
      setOpenIndividualStoryModal={setOpenIndividualStoryModal}
      openIndividualStoryModal={openIndividualStoryModal}
    />
  );
};

export default Science;
