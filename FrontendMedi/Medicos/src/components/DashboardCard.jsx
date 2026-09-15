import { UserRound, Pill, ClipboardList, HeartHandshake, Search, ClipboardCheck, ArrowRight} from "lucide-react";

const DashboardCard = ({title, description, buttonText, onClick, variant = "donor"}) => {

  const getCardStyle = () => {

    // ---------------- DONOR CARDS ----------------

    if (variant === "donor") {

      if (title === "Donor Profile") {
        return {
          icon: UserRound,
          iconBg: "bg-emerald-50",
          iconColor: "text-emerald-600",
          hoverBorder: "hover:border-emerald-200",
          button: "bg-emerald-500 hover:bg-emerald-600",
          shadow: "hover:shadow-emerald-100"
        };
      }

      if (title === "Publish Medicine") {
        return {
          icon: Pill,
          iconBg: "bg-teal-50",
          iconColor: "text-teal-600",
          hoverBorder: "hover:border-teal-200",
          button: "bg-teal-500 hover:bg-teal-600",
          shadow: "hover:shadow-teal-100"
        };
      }

      if (title === "Manage Medicines") {
        return {
          icon: ClipboardList,
          iconBg: "bg-indigo-50",
          iconColor: "text-indigo-600",
          hoverBorder: "hover:border-indigo-200",
          button: "bg-indigo-500 hover:bg-indigo-600",
          shadow: "hover:shadow-indigo-100"
        };
      }

      return {
        icon: HeartHandshake,
        iconBg: "bg-rose-50",
        iconColor: "text-rose-600",
        hoverBorder: "hover:border-rose-200",
        button: "bg-rose-500 hover:bg-rose-600",
        shadow: "hover:shadow-rose-100"
      };
    }


    // ---------------- NEEDY CARDS ----------------

    if (title === "Needy Profile") {
      return {
        icon: UserRound,
        iconBg: "bg-violet-50",
        iconColor: "text-violet-600",
        hoverBorder: "hover:border-violet-200",
        button: "bg-violet-500 hover:bg-violet-600",
        shadow: "hover:shadow-violet-100"
      };
    }

    if (title === "Find Medicines") {
      return {
        icon: Search,
        iconBg: "bg-cyan-50",
        iconColor: "text-cyan-600",
        hoverBorder: "hover:border-cyan-200",
        button: "bg-cyan-500 hover:bg-cyan-600",
        shadow: "hover:shadow-cyan-100"
      };
    }

    if (title === "My Requested Medicines") {
      return {
        icon: ClipboardCheck,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600",
        hoverBorder: "hover:border-amber-200",
        button: "bg-amber-500 hover:bg-amber-600",
        shadow: "hover:shadow-amber-100"
      };
    }

    return {
      icon: HeartHandshake,
      iconBg: "bg-rose-50",
      iconColor: "text-rose-600",
      hoverBorder: "hover:border-rose-200",
      button: "bg-rose-500 hover:bg-rose-600",
      shadow: "hover:shadow-rose-100"
    };
  };


  const style = getCardStyle();
  const Icon = style.icon;


  return (
    <div
      className={`
        group
        bg-white
        rounded-3xl
        border
        border-gray-100
        p-7
        shadow-sm
        ${style.hoverBorder}
        ${style.shadow}
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
      `}
    >

      {/* Icon */}
      <div className="flex items-center justify-between mb-6">

        <div
          className={`
            w-14
            h-14
            rounded-2xl
            ${style.iconBg}
            ${style.iconColor}
            flex
            items-center
            justify-center
            group-hover:scale-110
            transition-transform
            duration-300
          `}
        >
          <Icon className="w-7 h-7" />
        </div>


        {/* Arrow */}
        <div
          className="
            w-10
            h-10
            rounded-full
            bg-gray-50
            flex
            items-center
            justify-center
            text-gray-400
            group-hover:bg-gray-100
            group-hover:text-gray-700
            transition
          "
        >
          <ArrowRight className="w-5 h-5" />
        </div>

      </div>


      {/* Title */}
      <h2 className="text-xl font-black text-gray-900 mb-2">
        {title}
      </h2>


      {/* Description */}
      <p className="text-gray-500 leading-relaxed min-h-12 mb-6">
        {description}
      </p>


      {/* Button */}
      <button
        onClick={onClick}
        className={`
          w-full
          ${style.button}
          text-white
          py-3
          rounded-xl
          font-bold
          shadow-sm
          hover:shadow-md
          transition-all
          duration-300
          flex
          items-center
          justify-center
          gap-2
        `}
      >
        {buttonText}

        <ArrowRight className="w-4 h-4" />

      </button>

    </div>
  );
};

export default DashboardCard;