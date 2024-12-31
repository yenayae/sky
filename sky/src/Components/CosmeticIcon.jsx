import { Link } from "react-router-dom";
import styled from "styled-components";
import { supabase } from "../supabase/supabaseClient";
import { useEffect, useState } from "react";

const Icon = styled.img`
  background-color: ${(props) =>
    props.loading ? "transparent" : "rgba(20, 18, 14, 0.5)"};
  height: 70px;
  width: 70px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  transition: background-color 0.3s, opacity 0.5s ease-in;
  opacity: ${(props) => (props.loading ? 0 : 1)};
  &:hover {
    background-color: rgba(20, 18, 14, 0.7);
  }
`;

export default function CosmeticIcon({ cosmetic }) {
  const [cosmeticType, setCosmeticType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cosmeticPath, setCosmeticPath] = useState("");

  useEffect(() => {
    const fetchCosmeticType = async () => {
      let { data, error } = await supabase
        .from("cosmetic_types")
        .select("name")
        .eq("id", cosmetic.type_id)
        .single();

      if (error) {
        console.error("Error fetching cosmetic type:", error);
      } else {
        let category = data.name;
        if (data.name.includes("props")) {
          category = "props";
        }

        const path = `/img/cosmetics/${category}_icons/` + cosmetic.icon;
        setCosmeticPath(path);
        setCosmeticType(data);
        setLoading(false);
      }
    };

    fetchCosmeticType();
  }, [cosmetic.type_id, cosmetic.icon]);

  return (
    <Link to={`/cosmetics/${cosmetic.id}`}>
      <Icon
        src={loading ? "" : cosmeticPath}
        alt={cosmetic.name}
        loading={loading}
      />
    </Link>
  );
}
