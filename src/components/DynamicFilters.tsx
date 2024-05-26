import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";

interface OptionConfig {
  value: string;
  label: string;
}

interface FilterConfig {
  label: string;
  name: string;
  type: string;
  options: string[];
}

interface Props {
  filter: FilterConfig[];
  onClick: () => void;
}

export const DynamicFilters: React.FC<Props> = ({ filter, onClick }) => {
  return (
    <div className="flex space-x-2">
      {filter.map((item) => {
        return (
          <Select
          onValueChange={() => {
            if (
              document.getElementById("brand-select")?.textContent ===
              "All"
            ) {
              return;
            }

            // console.log(document.getElementById("brand-select")?.textContent)
          }}
        >
          <SelectTrigger className="w-[108px]">
            <SelectValue id={item.label} placeholder={item.label}/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{item.label}</SelectLabel>
              <SelectItem value="all">All</SelectItem>
                {item.options.map((option) => {
                  return (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  );
                })}
            </SelectGroup>
          </SelectContent>
        </Select>
        );
      })}
      <Button onClick={onClick} type="button" variant="gold_black">
        Filter
      </Button>
    </div>
  );
};