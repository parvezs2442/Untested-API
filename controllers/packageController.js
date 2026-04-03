import axios from "axios";

// 🔹 API 1: Package Health
export const getHealth = async (req, res) => {
  try {
    const { name, version } = req.params;

    // NPM data
    const npmRes = await axios.get(`https://registry.npmjs.org/${name}`);
    const pkgData = npmRes.data;

    const versionData = pkgData.versions[version];

    if (!versionData) {
      return res.status(404).json({ message: "Version not found" });
    }

    const license = versionData.license || "Not specified";

    // OSV vulnerabilities
    const vulnRes = await axios.post("https://api.osv.dev/v1/query", {
      package: {
        name: name,
        ecosystem: "npm"
      },
      version: version
    });

    const vulnerabilities = vulnRes.data.vulns || [];

    res.json({
      name,
      version,
      license,
      vulnerabilities
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 🔹 API 2: Package Releases
export const getReleases = async (req, res) => {
  try {
    const { name } = req.params;

    const npmRes = await axios.get(`https://registry.npmjs.org/${name}`);
    const pkgData = npmRes.data;

    const versions = Object.keys(pkgData.versions);

    const latest = pkgData["dist-tags"].latest;

    res.json({
      name,
      latest,
      versions
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};