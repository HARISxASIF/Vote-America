import {
    Menu,
    MenuButton,
    MenuList,
    MenuOptionGroup,
    Button,
    Checkbox,
    Stack,
  } from "@chakra-ui/react";
  import { ChevronDownIcon } from "@chakra-ui/icons";
  
  const MultipleSelectField = ({ options, selectedValues, onChange, placeholder }) => {
    const handleToggle = (value) => {
      if (selectedValues.includes(value)) {
        onChange(selectedValues.filter((v) => v !== value));
      } else {
        onChange([...selectedValues, value]);
      }
    };
  
    return (
      <Menu closeOnSelect={false}>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          w="100%"
          textAlign="left"
          variant="outline"
          borderColor="#CBD5E0"
          _focus={{ borderColor: "#082463", boxShadow: "0 0 0 1px #082463" }}
          _active={{ bg: '#fff' }}
        >
          {selectedValues.length > 0
            ? `${selectedValues.length} selected`
            : placeholder || "Select options"}
        </MenuButton>
        <MenuList maxHeight="200px" overflowY="auto">
          <MenuOptionGroup>
            <Stack spacing={2} px={3} py={1}>
              {options.map((option) => (
                <Checkbox
                  key={option.value}
                  isChecked={selectedValues.includes(option.value)}
                  onChange={() => handleToggle(option.value)}
                >
                  {option.label}
                </Checkbox>
              ))}
            </Stack>
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    );
  };
  export default MultipleSelectField;