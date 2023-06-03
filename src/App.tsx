import { Box, Menu, MenuItem, TextField } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import { PhoneNumberUtil } from "google-libphonenumber";
import COUNTRY_CODES from "./countryCodes.json";
import { PhoneNumberFormat } from "google-libphonenumber";

function App() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [input, setInput] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  useEffect(() => {
    if (!input || !selectedLanguage) return;

    const phoneUtil = PhoneNumberUtil.getInstance();
    try {
      const phone = phoneUtil.format(
        phoneUtil.parse(selectedLanguage + input),
        PhoneNumberFormat.E164
      );
      console.log("phone: ", phone);
    } catch (error) {}
  }, [input, selectedLanguage]);

  return (
    <Box sx={{ width: "400px" }}>
      <TextField
        ref={ref}
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        InputProps={{
          startAdornment: (
            <Box
              sx={{
                marginRight: "12px",
                borderRight: "1px solid #ccc",
              }}
              onClick={() => setAnchorEl(ref.current)}
            >
              <Box
                sx={{
                  marginRight: "8px",
                  padding: "2px 4px",
                  cursor: "pointer",

                  ":hover": {
                    backgroundColor: "#efefef",
                  },
                }}
              >
                {selectedLanguage || "Open"}
              </Box>
            </Box>
          ),
        }}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        PaperProps={{ sx: { mt: "8px", ml: "-8px", maxHeight: "300px" } }}
      >
        {COUNTRY_CODES.map((code) => (
          <MenuItem
            key={code.code}
            onClick={() => {
              setSelectedLanguage(code.dial_code);
              setAnchorEl(null);
            }}
          >
            {code.name} {code.dial_code}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default App;
